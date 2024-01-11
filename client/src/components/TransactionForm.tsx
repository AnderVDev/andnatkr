import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "./FlexBetween";
import { unflatten } from "flat";

// type Props = {};

// Initial Values
const initialValuesNewInput = {
  user: "",
  financeStatement: "",
  estate: "",
  amount: "",
  month: "",
  year: "",
  detail: "",
  comments: "",
};
const initialValuesExistingInput = {
  email: "",
  password: "",
};

// Input Validations
const newInputSchema = yup.object().shape({
  user: yup.string().required("required"), //user id
  financeStatement: yup.string().required("required"),
  estate: yup.string().required("required"), //estate id
  amount: yup.number().required().positive(),
  month: yup.string().required("required"),
  year: yup.number().required("required").positive(),
  detail: yup.string().nullable(),
  comments: yup.string().nullable(),
});

const ExistingInputSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

//Input data
const financeStatementsData = ["Income", "Expense"];
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

const TransactionForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [pageType, setPageType] = useState("newInput");
  const isNewInput = pageType === "newInput";
  const isExistingInput = pageType === "existingInput";

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isNewInput) await newInput(values, onSubmitProps);
  };

  const newInput = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      if (value === "user") {
        formData.append("user.id", values[value]);
      } else if (value === "estate") {
        formData.append("estate.id", values[value]);
      } else {
        formData.append(value, values[value]);
      }
      console.log({ value, [value]: values[value] });
    }

    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
    const jsonData = JSON.stringify(unflatten(formDataObject));

    console.log(jsonData);

    const savedResponse = await fetch(
      "http://localhost:8080/api/v1/management",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      }
    );
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={
        isNewInput ? initialValuesNewInput : initialValuesExistingInput
      }
      validationSchema={isNewInput ? newInputSchema : ExistingInputSchema}
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
            {isNewInput && (
              <>
                <TextField
                  label="User"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.user}
                  name="user"
                  error={Boolean(touched.user) && Boolean(errors.user)}
                  helperText={touched.user && errors.user}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  label="Statement"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.financeStatement}
                  name="financeStatement"
                  error={
                    Boolean(touched.financeStatement) &&
                    Boolean(errors.financeStatement)
                  }
                  helperText={
                    touched.financeStatement && errors.financeStatement
                  }
                  sx={{ gridColumn: "span 2" }}
                  select
                >
                  {/* <MenuItem value={"Income"}>Income</MenuItem>
                  <MenuItem value={"Expense"}>Expense</MenuItem> */}
                  {financeStatementsData.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  label="Estate"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.estate}
                  name="estate"
                  error={Boolean(touched.estate) && Boolean(errors.estate)}
                  helperText={touched.estate && errors.estate}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Amount"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.amount}
                  name="amount"
                  error={Boolean(touched.amount) && Boolean(errors.amount)}
                  helperText={touched.amount && errors.amount}
                  sx={{ gridColumn: "span 4" }}
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
                  label="Detail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.detail}
                  name="detail"
                  error={Boolean(touched.detail) && Boolean(errors.detail)}
                  helperText={touched.detail && errors.detail}
                  sx={{ gridColumn: "span 4" }}
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
            )}

            {/* <TextField
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
            /> */}
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
              Add
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default TransactionForm;
