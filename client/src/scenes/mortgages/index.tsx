import { Box, useTheme } from "@mui/material";
import { flatten } from "flat";
import ModalMortgages from "./Modal";
import Header from "../../components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import FlexBetween from "../../components/FlexBetween";
import { useGetMortgagesQuery } from "../../state/api";
import ActionButtons from "./Actions";

const Mortgages = () => {
  const theme = useTheme();
  // const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetMortgagesQuery({});
  const flattenedData = data ? data.map((item: JSON) => flatten(item)) : [];

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
    },
    {
      field: "user.firstName",
      headerName: "User",
      flex: 0.5,
    },
    {
      field: "estate.dep_number",
      headerName: "Dep Number",
      flex: 0.5,
    },
    {
      field: "installment_number",
      headerName: "Installment",
      flex: 0.5,
    },
    {
      field: "month",
      headerName: "Month",
      flex: 0.5,
    },
    {
      field: "year",
      headerName: "Year",
      flex: 0.5,
    },
    {
      field: "uf",
      headerName: "UF",
      flex: 0.4,
    },
    {
      field: "clp",
      headerName: "CLP",
      flex: 0.5,
    },
    {
      field: "comments",
      headerName: "Comments",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <ActionButtons row={params.row} modalType="update" />
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="MORTGAGES"
          subtitle="List of Transactions of Mortgages Payments"
        />
        <ModalMortgages modalType="new" id={1} />
      </FlexBetween>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.grey[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.paper,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.grey[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.neutral[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={flattenedData}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Mortgages;
