import { useGetActivitiesQuery } from "../../../state/api";
import { flatten } from "flat";
import {
  accumulatorByTotalAmount,
  accumulatorLast12Months,
  accumulatorTotalExpensesByDetailGrouped,
  accumulatorLast12MonthsByDetail,
  accumulatorTotalStatementsByMonth,
  accumulatorTotalDetailsByMonth,
  dataByUser,
} from "../../../utilitiesByUser";
import { useEffect, useState } from "react";
// import { financeTransactions } from "../datasets/dataset_Fake";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

// Define types based on the expected data structure
// interface TransactionData {
//   financeStatement: {
//     Income: number;
//     Expense: number;
//   };
// }

type ExpenseDetail = {
  detail: string;
  totalAmount: number;
};

type Transaction = {
  year: number; // The year of the transaction
  month: string; // The month of the transaction (e.g., 'January', 'February', etc.)
  totalIncome: number; // The total income for that month
  totalExpenses: number; // The total expenses for that month
};

type TotalDetailsByMonth = {
  year: number;
  month: string;
  details: {
    [key: string]: number; // A key-value pair where the key is a category (e.g., "Salary", "Grocery") and the value is the amount.
  };
};

type MonthlyTransactionsData = {
  year: number; // The year of the record
  month: string; // The name of the month
  totalIncome: number; // Total income for the month
  totalExpenses: number; // Total expenses for the month
};

type Total12MonthsByDetail = {
  year: number; // The year of the data
  month: string; // The name of the month (e.g., "June", "May")
  details: Record<string, number>; // A record of the categories and their respective amounts for that month
};

export function useActivitiesByUser() {
  const { data, isLoading, error } = useGetActivitiesQuery({});
  // const data = financeTransactions;

  const persisted = useSelector((state: RootState) => state.persisted);
  const { user } = persisted;
  const id = user ? user.id : "";

  // console.log({ id });

  const [totalIncomes, setTotalIncomes] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalStatementsByMonth, setTotalStatementsByMonth] = useState<
    Transaction[]
  >([]);
  const [totalDetailsByMonth, setTotalDetailsByMonth] = useState<
    TotalDetailsByMonth[]
  >([]);

  const [totalExpensesByDetail, setTotalExpensesByDetail] = useState<
    ExpenseDetail[]
  >([]);
  const [total12Months, setTotal12Months] = useState<MonthlyTransactionsData[]>(
    []
  );
  const [total12MonthsByDetail, setTotal12MonthsByDetail] = useState<
    Total12MonthsByDetail[]
  >([]);

  useEffect(() => {
    if (!isLoading && data && id) {
      // if (data) {
      try {
        // Flatten data
        const flattenedData = data.map((item: unknown) => flatten(item));
        const currentUserData = dataByUser(flattenedData, id);

        // Calculate totals
        const totalIncomesCalculated = accumulatorByTotalAmount(
          currentUserData,
          "financeStatement",
          "Income"
        );
        const totalExpensesCalculated = accumulatorByTotalAmount(
          currentUserData,
          "financeStatement",
          "Expense"
        );
        const totalStatementsByMonthCalculated =
          accumulatorTotalStatementsByMonth(currentUserData) as Transaction[];

        const totalDetailsByMonthCalculated = accumulatorTotalDetailsByMonth(
          currentUserData
        ) as TotalDetailsByMonth[];

        const totalExpensesByDetailCalculated =
          accumulatorTotalExpensesByDetailGrouped(
            currentUserData
          ) as ExpenseDetail[];

        const totals12MonthsCalculated =
          accumulatorLast12Months(currentUserData);

        const totals12MonthsByDetailCalculated =
          accumulatorLast12MonthsByDetail(currentUserData);

        // Set totals in state
        setTotalIncomes(totalIncomesCalculated);
        setTotalExpenses(totalExpensesCalculated);
        setTotalStatementsByMonth(totalStatementsByMonthCalculated);
        setTotalDetailsByMonth(totalDetailsByMonthCalculated);
        setTotal12Months(totals12MonthsCalculated);
        setTotalExpensesByDetail(totalExpensesByDetailCalculated);
        setTotal12MonthsByDetail(totals12MonthsByDetailCalculated);
        // console.log({ totalDetailsByMonthCalculated });
      } catch (err) {
        console.error("Error processing data:", err);
        setTotalIncomes(0);
        setTotalExpenses(0);
        setTotalExpensesByDetail([]);
      }
    }
    // }, [data]);
  }, [data, id, isLoading]);

  // return {
  //   totalIncomes,
  //   totalExpenses,
  //   totalStatementsByMonth,
  //   totalDetailsByMonth,
  //   total12Months,
  //   totalExpensesByDetail,
  //   total12MonthsByDetail,
  // };
  return {
    totalIncomes,
    totalExpenses,
    totalStatementsByMonth,
    totalDetailsByMonth,
    total12Months,
    totalExpensesByDetail,
    total12MonthsByDetail,
    isLoading,
    error,
  };
}
