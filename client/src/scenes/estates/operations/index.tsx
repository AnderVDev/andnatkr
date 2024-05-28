import { Box, useTheme } from "@mui/material";
import { flatten } from "flat";
import ModalRealEstate from "./Modal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../../../components/Header";
import FlexBetween from "../../../components/FlexBetween";
import { useGetEstateMgmtQuery } from "../../../state/api";
import ActionButtons from "../../../components/ActionButtons";
import numeral from "numeral";
import { CustomTheme } from "../../../theme";

const Operations = () => {
  const theme = useTheme<CustomTheme>();
  const { data, isLoading } = useGetEstateMgmtQuery({});
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
      field: "financeStatement",
      headerName: "Statement",
      flex: 0.7,
    },
    {
      field: "estate",
      headerName: "Dep Number",
      flex: 0.5,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.5,
      renderCell: (params) => numeral(params.value).format("0,0"),
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
      field: "detail",
      headerName: "Detail",
      flex: 1.8,
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
      renderCell: (params) =>
        !params.row.isMortgage ? (
          <ActionButtons row={params.row} modalType="update" />
        ) : null,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="OPERATIONS"
          subtitle="List of Real estate administration Transactions"
        />
        <ModalRealEstate modalType="new" row={undefined} />
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
            // backgroundColor: theme.palette.background.alt,
            backgroundColor: theme.palette.background.paper,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.grey[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.neutral.main} !important`,
          },
        }}
      >
        <DataGrid
          initialState={{
            sorting: {
              sortModel: [{ field: "id", sort: "desc" }],
            },
          }}
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={flattenedData}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Operations;
