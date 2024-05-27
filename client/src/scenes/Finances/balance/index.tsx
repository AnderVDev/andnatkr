import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Header from "../../../components/Header";
import FlexBetween from "../../../components/FlexBetween";
import {
  PaidOutlined,
  SavingsOutlined,
  AccountBalanceWalletOutlined,
  AccountBalanceOutlined,
  PaymentsOutlined,
  Person3Outlined,
  PermIdentityOutlined,
} from "@mui/icons-material";
import StatBox from "../../../components/StatBox";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import TodoList from "./todo/TodoList";
import Modal from "./todo/Modal";
import { useGetTransactionQuery } from "../../../state/api";
import { flatten } from "flat";
import numeral from "numeral";
import {
  accumulatorByTotalAmount,
  accumulatorUserByCurrentMonth,
  accumulatorCurrentMonthByStatement,
  accumulatorPreviousMonthByStatement,
} from "../../../utility";
import { CustomTheme } from "../../../theme";

const Balance = () => {
  const theme = useTheme<CustomTheme>();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetTransactionQuery({});
  const flattenedData = data ? data.map((item: JSON) => flatten(item)) : [];

  //Total data
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

  //Current Month data

  const incomesByCurrentMonth = accumulatorCurrentMonthByStatement(
    flattenedData,
    "Income"
  );

  const expensesByCurrentMonth = accumulatorCurrentMonthByStatement(
    flattenedData,
    "Expense"
  );
  const balanceByCurrentMonth = incomesByCurrentMonth - expensesByCurrentMonth;

  //Previous Month data

  const incomesByPreviousMonth = accumulatorPreviousMonthByStatement(
    flattenedData,
    "Income"
  );

  const expensesByPreviousMonth = accumulatorPreviousMonthByStatement(
    flattenedData,
    "Expense"
  );

  const userIncomeByCurrentMonth = accumulatorUserByCurrentMonth(
    flattenedData,
    "Anderson"
  );
  const user2IncomeByCurrentMonth = accumulatorUserByCurrentMonth(
    flattenedData,
    "Ana"
  );

  // Percentages data

  const incomesPercentage =
    incomesByPreviousMonth > 0
      ? ((incomesByCurrentMonth - incomesByPreviousMonth) * 100) /
        incomesByPreviousMonth
      : 100;

  const expensesPercentage =
    expensesByPreviousMonth > 0
      ? ((expensesByCurrentMonth - expensesByPreviousMonth) * 100) /
        expensesByPreviousMonth
      : 100;

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
          span="3"
          title="Total Balance"
          value={numeral(totalBalance).format("0,0.00")}
          increase=""
          description=""
          icon={<AccountBalanceOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Total Savings"
          value={numeral(totalSavings).format("0,0.00")}
          increase=""
          description=""
          icon={<SavingsOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Total Incomes"
          value={numeral(totalIncomes).format("0,0.00")}
          increase=""
          description=""
          icon={<PaidOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Total Expenses"
          value={numeral(totalExpenses).format("0,0.00")}
          increase=""
          description=""
          icon={<PaymentsOutlined sx={{ fontSize: "26px" }} />}
        />

        {/* ROW 2 */}
        <StatBox
          span="2"
          title="Anderson"
          value={numeral(userIncomeByCurrentMonth).format("0,0.00")}
          increase=""
          description="Current month"
          icon={<PermIdentityOutlined sx={{ fontSize: "26px" }} />}
        />

        <StatBox
          span="2"
          title="Ana"
          value={numeral(user2IncomeByCurrentMonth).format("0,0.00")}
          increase=""
          description="Current month"
          icon={<Person3Outlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="2"
          title="Balance"
          value={numeral(balanceByCurrentMonth).format("0,0.00")}
          increase=""
          description="Current month"
          icon={<AccountBalanceWalletOutlined sx={{ fontSize: "26px" }} />}
        />

        <StatBox
          span="3"
          title="Incomes"
          value={numeral(incomesByCurrentMonth).format("0,0.00")}
          increase={`${numeral(incomesPercentage).format("0,0.00")} %`}
          description="Since last month"
          icon={<PaidOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Expenses"
          value={numeral(expensesByCurrentMonth).format("0,0.00")}
          increase={`${numeral(expensesPercentage).format("0,0.00")} %`}
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
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          borderRadius="0.55rem"
          sx={{ backgroundColor: theme.palette.background.alt }}
        >
          <FlexBetween>
            <Typography variant="h6" sx={{ ml: "1rem" }}>
              Todo List
            </Typography>
            <Modal />
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
