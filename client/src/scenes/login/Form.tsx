import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { unflatten } from "flat";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useRegisterMutation } from "../../state/api.ts";
import FlexBetween from "../../components/FlexBetween.tsx";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

// type Props = {};

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [newLogin, isLoading] = useLoginMutation();
  const [newRegister, { isLoading: isLoadingRegister }] = useRegisterMutation();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // picture: "",
  };

  const schema = isLogin
    ? yup.object().shape({
        email: yup.string().email("invalid email").required("required"),
        password: yup.string().required("required"),
      })
    : yup.object().shape({
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        email: yup.string().email("invalid email").required("required"),
        password: yup.string().required("required"),
        // picture: yup.string().required("required"),
      });

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();

    for (const value in values) {
      formData.append(value, values[value]);
    }
    // formData.append("picturePath", values.picture.name);

    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(unflatten(formDataObject));

    const response = await newRegister(jsonData);
    const isAuthenticated =
      !response.isError && !response.isLoading && response;

    onSubmitProps.resetForm();
    if (isAuthenticated) {
      setIsLogin(true);
    }
  };

  const authenticate = async (values, onSubmitProps) => {
    const formData = new FormData();

    formData.append("email", values["email"]);
    formData.append("password", values["password"]);

    // for (const value in values) {
    //   formData.append(value, values[value]);
    // }

    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(unflatten(formDataObject));

    const response = await newLogin(jsonData);
    const isAuthenticated =
      !response.isError && !response.isLoading && response;

    onSubmitProps.resetForm();
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    // if (isLogin) await authenticate(values, onSubmitProps);
    // if (!isLogin) await register(values, onSubmitProps);
    isLogin
      ? await authenticate(values, onSubmitProps)
      : await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      // initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={schema}
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
                </Box>
                 */}
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
