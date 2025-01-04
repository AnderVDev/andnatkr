/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { unflatten } from "flat";
import {
  useAddEstateMgmtMutation,
  useUpdateEstateMgmtMutation,
} from "../../../state/api";
import { useSelector } from "react-redux";
import {
  months,
  currentMonth,
  currentYear,
  estateDetails,
} from "../../../dataUtil";
import { CustomTheme } from "../../../theme";
import { RootState } from "../../../state/store";

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

interface FormProps {
  onClosed: () => void;
  modalType: "newInput" | "update" | string;
  row: any;
}

interface FormValues {
  user: string;
  financeStatement: string;
  estate: string;
  amount: string;
  month: string;
  year: number;
  detail: string;
  comments: string;
  isMortgage: string;
}
const Form: React.FC<FormProps> = ({ onClosed, modalType, row }) => {
  const { palette } = useTheme<CustomTheme>();
  const isUpdateType = modalType === "update";
  const [addInput] = useAddEstateMgmtMutation();
  const [updateInput] = useUpdateEstateMgmtMutation();
  const [pageType] = useState<"newInput" | "update">("newInput");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const persisted = useSelector((state: RootState) => state.persisted);
  const { user } = persisted;
  const id = user ? user.id : "";

  // Initial Values
  const initialValues: FormValues = {
    user: isUpdateType ? row?.["user.id"] || id : id,
    financeStatement: isUpdateType ? row?.["financeStatement"] || "" : "",
    estate: isUpdateType ? row?.["estate"] || "" : "",
    amount: isUpdateType ? row?.["amount"] || "" : "",
    month: isUpdateType ? row?.["month"] || currentMonth : currentMonth,
    year: isUpdateType ? row?.["year"] || currentYear : currentYear,
    detail: isUpdateType ? row?.["detail"] || "" : "",
    comments: isUpdateType ? row?.["comments"] || "" : "",
    isMortgage: isUpdateType ? row?.["isMortgage"] || "false" : "false",
  };

  const handleFormSubmit = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    if (pageType === "newInput") await newInput(values, onSubmitProps);
  };

  const newInput = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(values)) {
      if (key === "user") {
        formData.append("user.id", value);
      } else {
        formData.append(key, value);
      }
    }

    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(unflatten(formDataObject));

    isUpdateType
      ? await updateInput({ id: row["id"], data: jsonData })
      : await addInput(jsonData);

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
            {pageType === "newInput" && (
              <>
                {/* <TextField
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
                /> */}

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
                  label="Detail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.detail}
                  name="detail"
                  error={Boolean(touched.detail) && Boolean(errors.detail)}
                  helperText={touched.detail && errors.detail}
                  sx={{ gridColumn: "span 2" }}
                  select
                >
                  {estateDetails.map((option, index) => (
                    <MenuItem key={`${option}-${index}`} value={option}>
                      {" "}
                      {/* Unique key by combining option and index */}
                      {option}
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

export default Form;
