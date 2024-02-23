import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { unflatten } from "flat";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../state/index";
import { useLoginMutation, useRegisterMutation } from "../../state/api";
import FlexBetween from "../../components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // picture: File | string;
}


const initialValues : FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  // picture: "",
};

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  // picture: yup.mixed().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const Form = () => {
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [pageType, setPageType] = useState<"login" | "register">("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const [newLogin, { isLoading, isError }] = useLoginMutation();
  const [
    newRegister,
    { isLoading: isLoadingRegister, isError: isErrorRegister },
  ] = useRegisterMutation();

  const register = async (values: FormValues, onSubmitProps: any) => {
    const formData = new FormData();

    for (const key in values) {
      formData.append(key, values[key]);
    }
    // formData.append("picturePath", values.picture!.name);

    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(unflatten(formDataObject));

    const response = await newRegister(jsonData);
    onSubmitProps.resetForm();
    if (!isErrorRegister && !isLoadingRegister && response) {
      setPageType("login");
    }
  };

  const authenticate = async (values: FormValues, onSubmitProps: any) => {
    const formData = new FormData();
    // for (const key in values) {
    //   formData.append(key, values[key]);
    // }
    formData.append("email", values["email"]);
    formData.append("password", values["password"]);

    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(unflatten(formDataObject));

    const response = await newLogin(jsonData);
    const { user, access_token, refresh_token } = response.data;

    onSubmitProps.resetForm();

    if (!isError && !isLoading && response) {
      dispatch(
        setCredentials({
          user: user,
          access_token: access_token,
          refresh_token: refresh_token,
        })
      );
      navigate("/dashboard");
    }
  };

  const handleFormSubmit = async (
    values: FormValues,
    onSubmitProps: any
  ) => {
    if (isLogin) await authenticate(values as FormValues, onSubmitProps);
    if (isRegister) await register(values as FormValues, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
      // initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      // validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />

                {/* <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box> */}

              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
