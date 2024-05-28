/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import { Formik} from "formik";
import * as yup from "yup";
import { CustomTheme } from "../theme";

interface FormValues {
  description: string;
}
const initialValues: FormValues = {
  description: "",
};

const todoSchema = yup.object().shape({
  description: yup.string().required("required"),
});

const handleFormSubmit = () => console.log("Form Submitted");

const TodoForm: React.FC = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme<CustomTheme>();
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
                  multiline
                  rows={6}
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 12", gridRow: "span 6"}}
                />
          </Box>
          <Divider sx={{ my: 2 }} />
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

export default TodoForm;
