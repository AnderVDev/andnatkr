/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import * as yup from "yup";
import { Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { unflatten } from "flat";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../../state/api.ts";
import FlexBetween from "../../components/FlexBetween.tsx";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { CustomTheme } from "../../theme.ts";
// type Props = {};

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme<CustomTheme>();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [newLogin] = useLoginMutation();
  const [newRegister] = useRegisterMutation();

  interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    // picture: string | any| File;
  }

  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // picture: "",
  };

  const schema = isLogin
    ? yup.object().shape({
        email: yup.string().email("invalid email").required("Required"),
        password: yup.string().required("Required"),
      })
    : yup.object().shape({
        firstName: yup.string().required("Required"),
        lastName: yup.string().required("Required"),
        email: yup.string().email("invalid email").required("Required"),
        password: yup.string().required("Required"),
        // picture: yup.mixed().required("Required"),
      });

  const register = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    const formData = new FormData();

    // for (const value in values) {
    //   if (value === "picture") {
    //     formData.append("avatar", values[value].name);
    //   } else {
    //     formData.append(value, values[value]);
    //   }
    // }

    for (const [key, value] of Object.entries(values)) {
      formData.append(key, value);
      
    }
    // for (const [key, value] of Object.entries(values)) {
    //   if (key === "picture") {
    //     formData.append("avatar", value.name);
    //   } else {
    //     formData.append(key, value);
    //   }
    // }
    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(unflatten(formDataObject));

    const response: any = await newRegister(jsonData);
    const isRegistered = response && !response.error;

    onSubmitProps.resetForm();
    if (isRegistered) {
      setIsLogin(true);
    }
  };

  const authenticate = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    const formData = new FormData();

    formData.append("email", values["email"]);
    formData.append("password", values["password"]);

    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(unflatten(formDataObject));

    const response: any = await newLogin(jsonData);
    const isSuccess = response && !response.error;

    onSubmitProps.resetForm();
    if (isSuccess) {
      navigate("/balance");
    }
  };

  const handleFormSubmit = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    isLogin
      ? await authenticate(values, onSubmitProps)
      : await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={schema}
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
            {!isLogin && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
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
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              label="Password"
              type="Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
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
                setIsLogin(!isLogin);
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
