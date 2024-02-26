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
  useAddEstateMgmtMutation,
  useUpdateEstateMgmtMutation,
} from "../state/api";
import { useSelector } from "react-redux";
import { months, currentMonth, currentYear } from "../dataUtil";

// Input Validations
const newInputSchema = yup.object().shape({
  user: yup.string().required("User is required"), // user id
  financeStatement: yup.string().required("Finance Statement is required"),
  estate: yup.string().required("Estate is required"), // estate id
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  month: yup.string().required("Month is required"),
  year: yup
    .number()
    .required("Year is required")
    .positive("Year must be positive"),
  detail: yup.string().nullable(),
  comments: yup.string().nullable(),
});

// Input data
const estatesData = ["506", "619"];
const financeStatementsData = ["Income", "Expense"];
// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

const TransactionForm = ({ onClosed, modalType, row }) => {
  const { palette } = useTheme();
  const isUpdateType = modalType === "update";
  const [addInput] = useAddEstateMgmtMutation();
  const [updateInput] = useUpdateEstateMgmtMutation();
  const [pageType, setPageType] = useState("newInput");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const persisted = useSelector((state) => state.persisted);
  const { user } = persisted;
  const { id } = user;

  // Initial Values
  const initialValues = {
    user: isUpdateType ? row["user.id"] : id,
    financeStatement: isUpdateType ? row["financeStatement"] : "",
    estate: isUpdateType ? row["estate"] : "",
    amount: isUpdateType ? row["amount"] : "",
    month: isUpdateType ? row["month"] : currentMonth,
    year: isUpdateType ? row["year"] : currentYear,
    detail: isUpdateType ? row["detail"] : "",
    comments: isUpdateType ? row["comments"] : "",
    isMortgage: isUpdateType ? row["isMortgage"] : "false",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (pageType === "newInput") await newInput(values, onSubmitProps);
  };

  const newInput = async (values, onSubmitProps) => {
    const formData = new FormData();

    for (const value in values) {
      if (value === "user") {
        formData.append("user.id", values[value]);
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
            {pageType === "newInput" && (
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
                  InputProps={{
                    readOnly: true,
                  }}
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
                  select
                >
                  {estatesData.map((estate) => (
                    <MenuItem key={estate} value={estate}>
                      {estate}
                    </MenuItem>
                  ))}
                </TextField>
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
                  {financeStatementsData.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>

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

export default TransactionForm;
