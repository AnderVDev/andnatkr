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
  useAddMortgagesMutation,
  useUpdateMortgagesMutation,
} from "../../state/api";

// Input Validations
const dataSchema = yup.object().shape({
  user: yup.string().required("required"), //user id
  estate: yup.string().required("required"), //estate id
  installment_number: yup.number().required().positive(),
  month: yup.string().required("required"),
  year: yup.number().required("required").positive(),
  uf: yup.number().required("required").positive(),
  clp: yup.number().required("required").positive(),
  comments: yup.string().nullable(),
});

//Input data
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Form = ({ onClosed, modalType, row }) => {
  const { palette } = useTheme();
  const isUpdateType = modalType === "update";
  const [addInput] = useAddMortgagesMutation();
  const [updateInput] = useUpdateMortgagesMutation();
  //   const [pageType, setPageType] = useState("newInput");
  //   const isExistingInput = pageType === "existingInput";
  //   const isNewInput = pageType === "newInput";
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // Initial Values
  const initialValues = {
    user: isUpdateType ? row["user.id"] : "",
    estate: isUpdateType ? row["estate.id"] : "",
    installment_number: isUpdateType ? row["installment_number"] : "",
    month: isUpdateType ? row["month"] : "",
    year: isUpdateType ? row["year"] : "",
    uf: isUpdateType ? row["uf"] : "",
    clp: isUpdateType ? row["clp"] : "",
    comments: isUpdateType ? row["comments"] : "",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await newEntry(values, onSubmitProps);
  };

  const newEntry = async (values, onSubmitProps) => {
    const formData = new FormData();

    for (const value in values) {
      if (value === "user") {
        formData.append("user.id", values[value]);
      } else if (value === "estate") {
        formData.append("estate.id", values[value]);
      } else {
        formData.append(value, values[value]);
      }
    }

    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(unflatten(formDataObject));
    isUpdateType
      ? updateInput({ id: row["id"], data: jsonData })
      : addInput(jsonData);
    onClosed();
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={dataSchema}
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
            <>
              <TextField
                label="User"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.user}
                name="user"
                error={Boolean(touched.user) && Boolean(errors.user)}
                helperText={touched.user && errors.user}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Estate"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.estate}
                name="estate"
                error={Boolean(touched.estate) && Boolean(errors.estate)}
                helperText={touched.estate && errors.estate}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                label="Installment Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.installment_number}
                name="installment_number"
                error={
                  Boolean(touched.installment_number) &&
                  Boolean(errors.installment_number)
                }
                helperText={
                  touched.installment_number && errors.installment_number
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Month"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.month}
                name="month"
                error={Boolean(touched.month) && Boolean(errors.month)}
                helperText={touched.month && errors.month}
                sx={{ gridColumn: "span 2" }}
                select
              >
                {months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                label="Year"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.year}
                name="year"
                error={Boolean(touched.year) && Boolean(errors.year)}
                helperText={touched.year && errors.year}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                label="UF"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.uf}
                name="uf"
                error={Boolean(touched.uf) && Boolean(errors.uf)}
                helperText={touched.uf && errors.uf}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                label="CLP"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.clp}
                name="clp"
                error={Boolean(touched.clp) && Boolean(errors.clp)}
                helperText={touched.clp && errors.clp}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                label="Comments"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.comments}
                name="comments"
                error={Boolean(touched.comments) && Boolean(errors.comments)}
                helperText={touched.comments && errors.comments}
                sx={{ gridColumn: "span 4" }}
              />
            </>
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
