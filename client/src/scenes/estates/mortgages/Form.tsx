/* eslint-disable @typescript-eslint/no-explicit-any */
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
  useAddMortgagesMutation,
  useUpdateMortgagesMutation,
  useAddEstateMgmtMutation,
  useUpdateEstateMgmtMutation,
} from "../../../state/api";
import { useSelector } from "react-redux";
import { months, currentMonth, currentYear } from "../../../dataUtil";
import { CustomTheme } from "../../../theme";
import { RootState } from "../../../state/store";

interface FormValues {
  user: string;
  estate: string;
  installment_number: number | string;
  month: string;
  year: number | string;
  uf: number | string;
  clp: number | string;
  comments: string;
}

// Input Validations
const dataSchema = yup.object().shape({
  user: yup.string().required("required"), //user id
  estate: yup.string().required("required"),
  installment_number: yup.number().required("required").positive(),
  month: yup.string().required("required"),
  year: yup.number().required("required").positive(),
  uf: yup.number().required("required").positive(),
  clp: yup.number().required("required").positive(),
  comments: yup.string().nullable(),
});

//Input data
const estatesData = ["506", "619"];

interface FormProps {
  onClosed: () => void;
  modalType: "newInput" | "update" | string;
  row: any;
}
const Form: React.FC<FormProps> = ({ onClosed, modalType, row }) => {
  const { palette } = useTheme<CustomTheme>();
  const isUpdateType = modalType === "update";
  const [addEntry] = useAddMortgagesMutation();
  const [updateEntry] = useUpdateMortgagesMutation();
  const [addInput] = useAddEstateMgmtMutation();
  const [updateInput] = useUpdateEstateMgmtMutation();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const persisted = useSelector((state: RootState) => state.persisted);
  const { user } = persisted;
  const id = user ? user.id : "";
  let inputId = "0";

  // Initial Values
  const initialValues: FormValues = {
    user: isUpdateType ? row["user.id"] : id,
    estate: isUpdateType ? row["estate"] : "",
    installment_number: isUpdateType ? row["installment_number"] : "",
    month: isUpdateType ? row["month"] : currentMonth,
    year: isUpdateType ? row["year"] : currentYear,
    uf: isUpdateType ? row["uf"] : "",
    clp: isUpdateType ? row["clp"] : "",
    comments: isUpdateType ? row["comments"] : "",
  };

  const handleFormSubmit = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    await newInput(values, onSubmitProps);
    if (inputId !== "0" || isUpdateType) {
      await newEntry(values, onSubmitProps);
    }
  };

  const newInput = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>
  ) => {
    const formData = new FormData();

    formData.append("user.id", values["user"]);
    formData.append("estate", values["estate"]);
    formData.append("financeStatement", "Expense");
    formData.append("amount", values["clp"] as string);
    formData.append("month", values["month"]);
    formData.append("year", values["year"] as string);
    formData.append(
      "detail",
      `Mortgage Payment, Installment#: ${values["installment_number"]}`
    );
    formData.append("comments", values["comments"]);
    formData.append("isMortgage", "true");

    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(unflatten(formDataObject));

    if (isUpdateType) {
      updateInput({ id: row["mgmt_input_id"], data: jsonData });
    } else {
      const {data}: any = await addInput(jsonData);
      inputId = data.id;
    }
    onSubmitProps.resetForm();
    onClosed();
  };

  const newEntry = async (
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
    formData.append("mgmt_input_id", inputId);

    const formDataObject = Object.fromEntries(formData.entries());
    const jsonData = JSON.stringify(unflatten(formDataObject));
    isUpdateType
      ? updateEntry({ id: row["id"], data: jsonData })
      : addEntry(jsonData);

    inputId = "0";
    onSubmitProps.resetForm();
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
