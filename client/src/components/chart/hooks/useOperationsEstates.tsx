import { useEffect, useState } from "react";
// import { realEstateTransactions } from "../datasets/dataset_Fake";
import {
  accumulatorLast12Months,
  accumulatorLast12MonthsByDetail,
  accumulatorTotalStatementsByMonth,
  totalIncomeAndExpensesByEstate,
  groupByDetail,
  groupMortgagePayments,
} from "../../../utilitiesEstates";
import { useGetEstateMgmtQuery } from "../../../state/api";

type Transaction = {
  year: number; // The year of the transaction
  month: string; // The month of the transaction (e.g., 'January', 'February', etc.)
  totalIncomes: number; // The total income for that month
  totalExpenses: number; // The total expenses for that month
};

type MonthlyTransactionsData = {
  year: number;
  month: string;
  totalIncome: number;
  totalExpenses: number;
};

type Total12MonthsByDetail = {
  year: number;
  month: string;
  details: Record<string, number>;
};

export function useOperationsEstates(estateId: string) {
  const { data, isLoading, error } = useGetEstateMgmtQuery({});

  const [totalIncomes, setTotalIncomes] = useState<number>(0);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalStatementsByMonth, setTotalStatementsByMonth] = useState<
    Transaction[]
  >([]);
  const [total12Months, setTotal12Months] = useState<MonthlyTransactionsData[]>(
    []
  );
  const [total12MonthsByDetail, setTotal12MonthsByDetail] = useState<
    Total12MonthsByDetail[]
  >([]);
  const [groupedExpensesByDetail, setGroupedExpensesByDetail] = useState<
    Record<string, number>
  >({});
  const [mortgagePayments, setMortgagePayments] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    if (!isLoading && data && estateId) {
      try {
        // Calculate totals using utilities
        const { totalIncomes: incomes, totalExpenses: expenses } =
          totalIncomeAndExpensesByEstate(data, estateId);
    
        const statementsByMonth = accumulatorTotalStatementsByMonth(
          data,
          estateId
        ) as Transaction[];
      
        const last12Months = accumulatorLast12Months(data, estateId);

        const last12MonthsByDetail = accumulatorLast12MonthsByDetail(
          data,
          estateId
        );

        const groupedByDetail = groupByDetail(data);
        const groupedMortgage = groupMortgagePayments(data);

        // Update state
        setTotalIncomes(incomes);
        setTotalExpenses(expenses);
        setTotalStatementsByMonth(statementsByMonth);
        setTotal12Months(last12Months);
        setTotal12MonthsByDetail(last12MonthsByDetail);
        setGroupedExpensesByDetail(groupedByDetail);
        setMortgagePayments(groupedMortgage);
      } catch (err) {
        console.error("Error processing data:", err);
        setTotalIncomes(0);
        setTotalExpenses(0);
        setTotalStatementsByMonth([]);
        setTotal12Months([]);
        setTotal12MonthsByDetail([]);
        setGroupedExpensesByDetail({});
        setMortgagePayments({});
      }
    }
  }, [data, estateId, isLoading]);

  return {
    totalIncomes,
    totalExpenses,
    totalStatementsByMonth,
    total12Months,
    total12MonthsByDetail,
    groupedExpensesByDetail,
    mortgagePayments,
    isLoading,
    error,
  };
}
