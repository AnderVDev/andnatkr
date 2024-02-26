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
  AttachMoneyOutlined,
  CurrencyExchangeOutlined,
  AccountBalanceOutlined,
  PaymentsOutlined,
  Person3Outlined,
  PermIdentityOutlined,
} from "@mui/icons-material";
import StatBox from "../../components/StatBox";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import TodoList from "../../components/TodoList";
// import Dialog from "../../components/Dialog";
import Modal from "../../components/Modal";
import { useGetTransactionQuery } from "../../state/api";
import { flatten } from "flat";
import numeral from "numeral";
import {
  filterByKey,
  accumulatorByAmount,
  accumulatorByTotalAmount,
} from "../../utility";
type Props = {};

// const filterTotalDetails = [
//   {
//     key: "detail",
//     value: "saving",
//   },
//   {
//     key: "financeStatement",
//     value: "Incomes",
//   },
//   {
//     key: "detail",
//     value: "Expenses",
//   },
// ];

const filterDetails = [
  {
    key: "user.firstName",
    value: "Fake",
    accumulator: {
      key: "financeStatement",
      value: "Income",
    },
  },
  {
    key: "estate",
    value: "506",
    accumulator: {
      key: "financeStatement",
      value: "Expense",
    },
  },
  {
    key: "estate",
    value: "619",
    accumulator: {
      key: "user.firstName",
      value: "Income",
    },
  },
  {
    key: "estate",
    value: "619",
    accumulator: {
      key: "financeStatement",
      value: "Expense",
    },
  },
];



const Balance = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetTransactionQuery({});
  const flattenedData = data ? data.map((item: JSON) => flatten(item)) : [];

  const totalIncomes = accumulatorByTotalAmount(
    flattenedData,
    "financeStatement",
    "Income"
  );
  const totalExpenses = accumulatorByTotalAmount(
    flattenedData,
    "financeStatement",
    "Expense"
  );
  const totalSavings = accumulatorByTotalAmount(
    flattenedData,
    "detail",
    "Saving"
  );
  const totalBalance = totalIncomes - totalExpenses;

  //Calculate values

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
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BALANCE" subtitle="Managing Finance Home Transactions" />

      {/* Main Grid */}
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
          span="4"
          title="Anderson"
          value="1000"
          increase=""
          description=""
          icon={<PermIdentityOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="2"
          title="Balance"
          value="1000"
          increase=""
          description="Current month"
          icon={<AccountBalanceWalletOutlined sx={{ fontSize: "26px" }} />}
        />

        <StatBox
          span="4"
          title="Ana"
          value="1000"
          increase="+14%"
          description=""
          icon={<Person3Outlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="2"
          title="Balance"
          value="1500"
          increase=""
          description="Current month"
          icon={<AccountBalanceWalletOutlined sx={{ fontSize: "26px" }} />}
        />

        {/* ROW 2 */}
        <StatBox
          span="3"
          title="Balance"
          value={numeral(totalBalance).format("0,0.00")}
          increase="+14%"
          description="Since last month"
          icon={<AccountBalanceOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Savings"
          value={numeral(totalSavings).format("0,0.00")}
          increase="+14%"
          description="Since last month"
          icon={<SavingsOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Incomes"
          value={numeral(totalIncomes).format("0,0.00")}
          increase="+14%"
          description="Since last month"
          icon={<PaidOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Expenses"
          value={numeral(totalExpenses).format("0,0.00")}
          increase="+14%"
          description="Since last month"
          icon={<PaymentsOutlined sx={{ fontSize: "26px" }} />}
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

export default Balance;
