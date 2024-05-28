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
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAddTodoMutation } from "../../../state/api";
import { unflatten } from "flat";
import { CustomTheme } from "../../../theme";
import { RootState } from "../../../state/store";

interface FormValues {
  description: string;
}
const initialValues: FormValues = {
  description: "",
};

const todoSchema = yup.object().shape({
  description: yup.string().required("required"),
});

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme<CustomTheme>();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [addTodo] = useAddTodoMutation();
  const persisted = useSelector((state: RootState) => state.persisted);
  const { user } = persisted;
  const id = user ? user.id : "";
  // const { id } = user;

  const handleFormSubmit = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    await newTask(values, onSubmitProps);
  };

  const newTask = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    const formData = new FormData();

    formData.append("user.id", id);
    formData.append("description", values["description"]);
    formData.append("isChecked", "false");
    formData.append("type", "estates");

    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(unflatten(formDataObject));

     await addTodo(jsonData);
    // const isAdded = !isError && !isLoading;
    onSubmitProps.resetForm();
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
