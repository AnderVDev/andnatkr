import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Header from "../../../components/Header";
import FlexBetween from "../../../components/FlexBetween";
import StatBox from "../../../components/StatBox";
import {
  AccountBalanceOutlined,
  AccountBalanceWalletOutlined,
  PaidOutlined,
  PaymentsOutlined,
  SavingsOutlined,
} from "@mui/icons-material";
import numeral from "numeral";
import {
  accumulatorByTotalAmount,
  accumulatorCurrentMonthByStatement,
  accumulatorPreviousMonthByStatement,
} from "../../../utility";
// import { financeTransactions } from "../../../components/chart/datasets/dataset_Fake";
import { dataByUser } from "../../../utilitiesByUser";


import SavingPersonalGrid from "./saving_grid/SavingPersonalGrid";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { useGetActivitiesQuery } from "../../../state/api";
import { flatten } from "flat";
import TodoList from "./todo/TodoList";
import Modal from "./todo/Modal";
import { CustomTheme } from "../../../theme";

const Finance = () => {
  const theme = useTheme<CustomTheme>();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const persisted = useSelector((state: RootState) => state.persisted);
  const { user } = persisted;
  const id = user ? user.id : "";

  const { data } = useGetActivitiesQuery({});
  // console.log({ data });

  const flattenedData = data ? data.map((item: JSON) => flatten(item)) : [];

  // console.log({ flattenedData });
  
    //Total data


  const currentUserData = dataByUser(flattenedData, id);
  // const currentUserData = dataByUser(
  //   financeTransactions,
  //   "cde08541-13e8-43bc-b662-c349b0652bf9"
  // );

  const totalIncomes = accumulatorByTotalAmount(
    currentUserData,
    "financeStatement",
    "Income"
  );
  const totalExpenses = accumulatorByTotalAmount(
    currentUserData,
    "financeStatement",
    "Expense"
  );
  const totalSavings = accumulatorByTotalAmount(
    currentUserData,
    "detail",
    "Saving"
  );
  const totalBalance = totalIncomes - totalExpenses;
  const totalAccount =  totalBalance + totalSavings;





  //Current Month data
  
  const incomesByCurrentMonth = accumulatorCurrentMonthByStatement(
    currentUserData,
    "Income"
  );

  const expensesByCurrentMonth = accumulatorCurrentMonthByStatement(
    currentUserData,
    "Expense"
  );
  const balanceByCurrentMonth = incomesByCurrentMonth - expensesByCurrentMonth;

  //Previous Month data

  const incomesByPreviousMonth = accumulatorPreviousMonthByStatement(
    currentUserData,
    "Income"
  );

  const expensesByPreviousMonth = accumulatorPreviousMonthByStatement(
    currentUserData,
    "Expense"
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

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Personal Finance" subtitle="Resume of Finance" />
        {/* <ModalTransaction modalType="new" row={undefined} /> */}
      </FlexBetween>
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
          title="Total Account"
          value={numeral(totalAccount).format("0,0.00")}
          increase=""
          description=""
          icon={<AccountBalanceOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="3"
          title="Total Balance"
          value={numeral(totalBalance).format("0,0.00")}
          increase=""
          description=""
          icon={<AccountBalanceWalletOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="2"
          title="Total Savings"
          value={numeral(totalSavings).format("0,0.00")}
          increase=""
          description=""
          icon={<SavingsOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="2"
          title="Total Incomes"
          value={numeral(totalIncomes).format("0,0.00")}
          increase=""
          description=""
          icon={<PaidOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="2"
          title="Total Expenses"
          value={numeral(totalExpenses).format("0,0.00")}
          increase=""
          description=""
          icon={<PaymentsOutlined sx={{ fontSize: "26px" }} />}
        />
        {/* ROW 2 */}
        <StatBox
          span="4"
          title="Balance"
          value={numeral(balanceByCurrentMonth).format("0,0.00")}
          increase=""
          description="Current month"
          icon={<AccountBalanceWalletOutlined sx={{ fontSize: "26px" }} />}
        />

        <StatBox
          span="4"
          title="Incomes"
          value={numeral(incomesByCurrentMonth).format("0,0.00")}
          increase={`${numeral(incomesPercentage).format("0,0.00")} %`}
          description="Since last month"
          icon={<PaidOutlined sx={{ fontSize: "26px" }} />}
        />
        <StatBox
          span="4"
          title="Expenses"
          value={numeral(expensesByCurrentMonth).format("0,0.00")}
          increase={`${numeral(expensesPercentage).format("0,0.00")} %`}
          description="Since last month"
          icon={<PaymentsOutlined sx={{ fontSize: "26px" }} />}
        />

        {/* Row 3 */}

        <SavingPersonalGrid />

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

        {/* End of main Grid */}
      </Box>
    </Box>
  );
};

export default Finance;
