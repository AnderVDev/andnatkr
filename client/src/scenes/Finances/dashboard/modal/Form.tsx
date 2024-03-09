import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { unflatten } from "flat";
import {
  useAddGoalMutation,
  useUpdateGoalMutation,
} from "../../../../state/api";
import { useSelector } from "react-redux";
import numeral from "numeral";

// Input Validations
const newInputSchema = yup.object().shape({
  user: yup.string().required("User is required"), // user id
  objective: yup.string().required("Objective description is required"),
  target: yup
    .number()
    .required("target value is required")
    .positive("target value must be positive"),
});

const Form = ({ onClosed, modalType, row }) => {
  const { palette } = useTheme();
  const isUpdateType = modalType === "update";
  const [addGoal, { isLoading, isError }] = useAddGoalMutation();
  const [updateInput] = useUpdateGoalMutation();
  const [pageType, setPageType] = useState("newInput");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const persisted = useSelector((state) => state.persisted);
  const { user } = persisted;
  const { id } = user;

  // Initial Values
  const initialValues = {
    user: isUpdateType ? row["user.id"] : id,
    objective: isUpdateType ? row["objective"] : "",
    target: isUpdateType ? row["target"] : "",
    current: "",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await newInput(values, onSubmitProps);
  };

  const newInput = async (values, onSubmitProps) => {
    const formData = new FormData();

    formData.append("user.id", id);
    formData.append("objective", values["objective"]);
    formData.append("target", values["target"]);
    formData.append(
      "current",
      isUpdateType
        ? numeral(row["current"]).value() + numeral(values["current"]).value()
        : "0"
    );

    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(unflatten(formDataObject));

    const response = isUpdateType
      ? updateInput({ id: row["id"], data: jsonData })
      : await addGoal(jsonData);
    const isAdded = !isError && !isLoading;
    onSubmitProps.resetForm();
    onClosed();
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={newInputSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
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
            {!isUpdateType ? (
              <>
                <TextField
                  label="User"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.user}
                  name="user"
                  error={Boolean(touched.user) && Boolean(errors.user)}
                  helperText={touched.user && errors.user}
                  sx={{ gridColumn: "span 12" }}
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <TextField
                  label="Objective"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.objective}
                  name="objective"
                  rows={4}
                  error={
                    Boolean(touched.objective) && Boolean(errors.objective)
                  }
                  helperText={touched.objective && errors.objective}
                  sx={{ gridColumn: "span 12" }}
                  multiline
                />

                <TextField
                  label="Target"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.target}
                  name="target"
                  error={Boolean(touched.target) && Boolean(errors.target)}
                  helperText={touched.target && errors.target}
                  sx={{ gridColumn: "span 12" }}
                />
              </>
            ) : (
              <TextField
                label="Add Money"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.current}
                name="current"
                error={Boolean(touched.current) && Boolean(errors.current)}
                helperText={touched.current && errors.current}
                sx={{ gridColumn: "span 12" }}
              />
            )}
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
              {isUpdateType ? "Update" : "Add"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
