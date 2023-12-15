import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";
import {
  AddCircleOutlineOutlined,
  Email,
  PaidOutlined,
  SavingsOutlined,
  AccountBalanceWalletOutlined,
  MonetizationOnOutlined,
  ManOutlined,
  Person3Outlined,
  PermIdentityOutlined,
} from "@mui/icons-material";
import StatBox from "../../components/StatBox";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import TodoList from "../../components/TodoList";
// import Dialog from "../../components/Dialog";
import Modal from "../../components/Modal";

type Props = {};
const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      //   renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      //   renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

const Overview = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  //   const { data, isLoading } = useGetDashboardQuery();
  const { data, isLoading } = useState(false);
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="OVERVIEW" subtitle="Real Estate Overview" />
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
        {/* ROW 1 */}
        <StatBox
          span="3"
          title="Balance"
          value="1000"
          increase="+14%"
          description="Since last month"
          icon={<AccountBalanceWalletOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Assets"
          value="1000"
          increase="+14%"
          description="Since last month"
          icon={<MonetizationOnOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Liabilities"
          value="1000"
          increase="+14%"
          description="Since last month"
          icon={<PaidOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Total Amount"
          value="1000"
          increase="+14%"
          description="Since last month"
          icon={<SavingsOutlined sx={{ fontSize: "26px" }} />}
        />
        {/* ROW 2 */}
        <StatBox
          span="6"
          title="Anderson"
          value="1000"
          increase="+14%"
          description="Since last month"
          icon={<PermIdentityOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="6"
          title="Ana"
          value="1000"
          increase="+14%"
          description="Since last month"
          icon={<Person3Outlined sx={{ fontSize: "26px" }} />}
        />

        {/* Row3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          borderRadius="0.55rem"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
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
            loading={false}
            // loading={isLoading || !data}
            getRowId={() => {}}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          borderRadius="0.55rem"
          sx={{ backgroundColor: theme.palette.background.alt }}
        >
          <FlexBetween>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.secondary[100], ml: "1rem" }}
            >
              TodoList
            </Typography>
            {/* <Dialog /> */}
            <Modal />
            {/* <IconButton>
              <AddCircleOutlineOutlined sx={{ fontSize: "1.5rem" }} />
            </IconButton> */}
          </FlexBetween>
          <TodoList />
        </Box>
      </Box>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      ></Box>
    </Box>
  );
};

export default Overview;
