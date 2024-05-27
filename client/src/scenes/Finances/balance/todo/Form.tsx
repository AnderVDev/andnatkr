import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { useAddTodoMutation } from "../../../../state/api";
import { unflatten } from "flat";
import { CustomTheme } from "../../../../theme";
import { RootState } from "../../../../state/store";

// Define type for form values
interface FormValues {
  description: string;
}
const initialValues: FormValues = {
  description: "",
};

const todoSchema = yup.object().shape({
  description: yup.string().required("Required"),
});

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme<CustomTheme>();
  const [addTodo] = useAddTodoMutation();
  const persisted = useSelector((state: RootState) => state.persisted);
  const { user  } = persisted;
  const id = user ? user.id : '';

  const handleFormSubmit = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    try {
      await newTask(values, onSubmitProps);
    } catch (error) {
      // Handle form submission error
      console.error("Form submission error:", error);
    }

  };

  const newTask = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    try {
      const formData = new FormData();

      formData.append("user.id", id);
      formData.append("description", values["description"]);
      formData.append("isChecked", "false");
      formData.append("type", "finances");

      const formDataObject = Object.fromEntries(formData.entries());
      const jsonData = JSON.stringify(unflatten(formDataObject));

      await addTodo(jsonData);

      onSubmitProps.resetForm();
    } catch (error) {
      // Handle async function error
      console.error("Async function error:", error);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={todoSchema}
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
            <TextField
              label="Description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              rows={6}
              error={
                Boolean(touched.description) && Boolean(errors.description)
              }
              helperText={touched.description && errors.description}
              sx={{ gridColumn: "span 12" }}
              multiline
            />
          </Box>
          <Divider />
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
            Add
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default Form;
