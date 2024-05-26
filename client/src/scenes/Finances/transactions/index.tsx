import { Box, useTheme } from "@mui/material";
import { flatten } from "flat";
import ModalTransaction from "./Modal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../../../components/Header";
import FlexBetween from "../../../components/FlexBetween";
import { useGetTransactionQuery } from "../../../state/api";
import ActionButtons from "./ActionButtons";
import numeral from "numeral";
import { CustomTheme } from "../../../theme";
const Transactions = () => {
  const theme = useTheme<CustomTheme>();
  // const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetTransactionQuery({});
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
      flex: 0.7,
    },
    {
      field: "financeStatement",
      headerName: "Statement",
      flex: 0.7,
    },
    {
      field: "detail",
      headerName: "Detail",
      flex: 0.7,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.7,
      renderCell: (params) => numeral(params.value).format("0,0.00"),
    },
    {
      field: "month",
      headerName: "Month",
      flex: 0.7,
    },
    {
      field: "year",
      headerName: "Year",
      flex: 0.7,
    },

    {
      field: "comments",
      headerName: "Comments",
      flex: 1.5,
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
        <Header title="TRANSACTIONS" subtitle="List of Transactions" />
        <ModalTransaction modalType="new" id={1} />
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
            // color: `${theme.palette.neutral[200]} !important`,
            color: `${theme.palette.neutral.main} !important`,
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

export default Transactions;
