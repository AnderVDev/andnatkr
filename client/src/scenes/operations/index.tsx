import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import StatBox from "../../components/StatBox";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import ModalRealEstate from "./Modal";
import { useGetEstateMgmtQuery } from "../../state/api";
import { flatten } from "flat";

type Props = {};

const columns = [
  {
    field: "id",
    headerName: "ID",
    flex: 0.5,
  },
  {
    field: "user.firstName",
    headerName: "User",
    flex: 1,
  },

  {
    field: "financeStatement",
    headerName: "Statement",
    flex: 0.7,
  },
  {
    field: "estate.dep_number",
    headerName: "Estate",
    flex: 0.7,
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 0.7,
  },
  {
    field: "month",
    headerName: "Month",
    flex: 0.7,
  },
  {
    field: "year",
    headerName: "Year",
    flex: 1,
  },
  {
    field: "detail",
    headerName: "Detail",
    flex: 1,
  },
  {
    field: "comments",
    headerName: "Comments",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "created At",
    flex: 1,
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    flex: 1,
  },
];


const Operations = (props: Props) => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetEstateMgmtQuery();
  const flattenedData = data ? data.map((item) => flatten(item)) : [];
  console.log({ flattenedData, data });
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="OPERTATIONS"
          subtitle="List of Real estate administration Transactions"
        />
        <ModalRealEstate />
      </FlexBetween>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.alt,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.id}
          rows={flattenedData || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Operations;
