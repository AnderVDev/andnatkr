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
  ApartmentOutlined,
  PaidOutlined,
  SavingsOutlined,
  AccountBalanceWalletOutlined,
  MonetizationOnOutlined,
  ManOutlined,
  Person3Outlined,
  PermIdentityOutlined,
} from "@mui/icons-material";
import StatBox from "../../components/StatBox";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import TodoList from "../../components/TodoList";
import Modal from "../../components/Modal";
import {
  useGetChileanIndicatorsQuery,
  useGetEstateMgmtQuery,
} from "../../state/api";
import { flatten } from "flat";
import ActionButtons from "../../components/ActionButtons";

const sumAmountByStatement = (data, statement) => {
  return data.reduce((sum, entry) => {
    if (entry.financeStatement === statement) {
      return sum + entry.amount;
    }
    return sum;
  }, 0);
};

const Overview = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetEstateMgmtQuery({});
  const { data: chileanIndex, isLoading: IsloadingChilean } =
    useGetChileanIndicatorsQuery({});
  const flattenedData = data ? data.map((item: JSON) => flatten(item)) : [];

  const filterBig = data ? data.filter((entry) => entry.estate === "506") : [];
  const expenseSum =
    filterBig.length > 0 ? sumAmountByStatement(filterBig, "Expense") : 0;
  const incomeSum =
    filterBig.length > 0 ? sumAmountByStatement(filterBig, "Income") : 0;

  const filterSmall = data
    ? data.filter((entry) => entry.estate === "619")
    : [];
  const expenseSumSmall =
    filterSmall.length > 0 ? sumAmountByStatement(filterSmall, "Expense") : 0;
  const incomeSumSmall =
    filterSmall.length > 0 ? sumAmountByStatement(filterSmall, "Income") : 0;

  console.log(chileanIndex);

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
      flex: 1,
    },
    {
      field: "comments",
      headerName: "Comments",
      flex: 1,
    },
  ];

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
          span="6"
          title="Belisario Prats 1850"
          value="unit 506 - deposit and parking lot "
          increase="3B / 2B"
          description="Independencia, RM - Chile"
          icon={<ApartmentOutlined sx={{ fontSize: "26px" }} />}
        />

        <StatBox
          span="6"
          title="Belisario Prats 1850"
          value="unit 619"
          increase="1B / 1B"
          description="Independencia, RM - Chile"
          icon={<ApartmentOutlined sx={{ fontSize: "26px" }} />}
        />

        {/* ROW 2 */}

        <StatBox
          span="2"
          title="Total Incomes "
          value={incomeSum}
          increase="506"
          description=""
          icon={<AccountBalanceWalletOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="2"
          title="Total Expenses"
          value={expenseSum}
          increase="506"
          description=""
          icon={<MonetizationOnOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="2"
          title="Current Leasing"
          value="500.000 "
          increase="506"
          description="UF"
          icon={<ApartmentOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Total Incomes"
          value={incomeSumSmall}
          increase="619"
          description=""
          icon={<PaidOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Total Expenses"
          value={expenseSumSmall}
          increase="619"
          description=""
          icon={<SavingsOutlined sx={{ fontSize: "26px" }} />}
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
        {/* <Box
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
            <Modal />
          </FlexBetween>
          <TodoList />
        </Box> */}
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
