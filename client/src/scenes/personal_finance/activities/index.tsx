import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { flatten } from "flat";
import ModalTransaction from "./Modal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../../../components/Header";
import FlexBetween from "../../../components/FlexBetween";
import { useGetActivitiesQuery } from "../../../state/api";
import ActionButtons from "./ActionButtons";
import numeral from "numeral";
import { CustomTheme } from "../../../theme";


const Transactions = () => {
  const theme = useTheme<CustomTheme>();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetActivitiesQuery({});
  const flattenedData = data ? data.map((item: JSON) => flatten(item)) : [];

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.3,
    },
    // {
    //   field: "user.firstName",
    //   headerName: "User",
    //   flex: 0.7,
    // },
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
        <Header title="Personal Finance" subtitle="Resume of Finance" />
        {/* <ModalTransaction modalType="new" row={undefined} /> */}
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
      
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          borderRadius="0.55rem"
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
              color: `${theme.palette.neutral.main} !important`,
            },
          }}
        >
          <Box gridColumn="span 12" gridRow="span 3" borderRadius="0.55rem">
            <FlexBetween>
              <Typography variant="h6" sx={{ ml: "1rem" }}>
                Activities List
              </Typography>
              <ModalTransaction modalType="new" row={undefined} />
            </FlexBetween>
          </Box>
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
     
    </Box>
  );
};

export default Transactions;
