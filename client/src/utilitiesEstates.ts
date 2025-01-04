/* eslint-disable @typescript-eslint/no-explicit-any */
import { currentMonth, currentYear, months } from "./dataUtil";

// type Transaction = {
//   year: number; // The year of the transaction
//   month: string; // The month of the transaction (e.g., 'January', 'February', etc.)
//   totalIncomes: number; // The total income for that month
//   totalExpenses: number; // The total expenses for that month
// };

// type FinancialData = {
//   year: number;
//   month: string;
//   financeStatement: "Income" | "Expense";
//   amount: number;
// };

type MonthlySummary = {
  year: number;
  month: string;
  totalIncome: number;
  totalExpenses: number;
};

export const filterByEstate = (data: any[], estateId: string) => {
  return data.filter((transaction) => transaction.estate === estateId);
};

export const groupMortgagePayments = (data: any[]) => {
  const filteredMortgageData = data.filter(
    (transaction) => transaction.isMortgage === true
  );

  return filteredMortgageData.reduce((acc, transaction) => {
    const installment = transaction.detail.split(",")[0]; // "Mortgage Payment"
    acc[installment] = (acc[installment] || 0) + transaction.amount;
    return acc;
  }, {} as Record<string, number>);
};

export const groupByDetail = (data: any[]) => {
  return data.reduce((acc, transaction) => {
    const { detail, amount } = transaction;
    acc[detail] = (acc[detail] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);
};

export const accumulatorLast12Months = (data: any[], estateId: string) => {
  const filteredDataByEstate = filterByEstate(data, estateId);
  // Helper function to calculate total for a given month/year and statement type
  const calculateTotal = (
    _data: any[],
    year: number,
    month: string,
    financeStatement: string
  ) => {
    const filteredData = filteredDataByEstate.filter(
      (entry) =>
        entry.year === year &&
        entry.month === month &&
        entry.financeStatement === financeStatement
      // entry.financeStatement === financeStatement
    );

    return filteredData.reduce((total, entry) => total + entry.amount, 0);
  };

  // Prepare dataset for the last 12 months
  const dataset: MonthlySummary[] = [];
  let year = currentYear;
  let monthIndex = months.indexOf(currentMonth);

  for (let i = 0; i < 12; i++) {
    const month = months[monthIndex];

    // Calculate total income and expenses for the current month/year
    const totalIncome = calculateTotal(data, year, month, "Income");
    const totalExpenses = calculateTotal(data, year, month, "Expense");

    // Add the result to the dataset
    dataset.push({
      year,
      month,
      totalIncome,
      totalExpenses,
    });

    // Move to the previous month
    monthIndex -= 1;
    if (monthIndex < 0) {
      monthIndex = 11; // December
      year -= 1; // Move to the previous year
    }
  }

  return dataset.reverse(); // Reverse to get data in chronological order
};

export const totalIncomeAndExpensesByEstate = (
  data: any[],
  estateId: string
) => {
  const filteredData = filterByEstate(data, estateId);

  return filteredData.reduce(
    (acc, transaction) => {
      if (transaction.financeStatement === "Income") {
        acc.totalIncomes += transaction.amount;
      } else if (transaction.financeStatement === "Expense") {
        acc.totalExpenses += transaction.amount;
      }
      return acc;
    },
    { totalIncomes: 0, totalExpenses: 0 }
  );
};

export const accumulatorTotalStatementsByMonth = (
  data: any[],
  estateId: string
) => {
  const filteredData = filterByEstate(data, estateId);
  const totalIncomeAndExpensesData = filteredData.reduce((acc, transaction) => {
    const { year, month, amount, financeStatement } = transaction;
    const key = `${year}-${month}`;

    // Initialize the entry for the year-month if not already present
    if (!acc[key]) {
      acc[key] = {
        year,
        month,
        totalIncomes: 0,
        totalExpenses: 0,
      };
    }

    // Accumulate income and expenses separately
    if (financeStatement === "Income") {
      acc[key].totalIncomes += amount;
    } else if (financeStatement === "Expense") {
      acc[key].totalExpenses += amount;
    }

    return acc;
  }, {} as { [key: string]: { year: number; month: string; totalIncome: number; totalExpenses: number } });

  // Convert the accumulated data into an array and return it
  return Object.values(totalIncomeAndExpensesData);
};

export const accumulatorLast12MonthsByDetail = (
  data: any[],
  estateId: string
) => {
  const filteredDataByEstate = filterByEstate(data, estateId);

  // Helper function to calculate the previous year and month
  const getPreviousMonthAndYear = (
    monthIndex: number,
    year: number
  ): { month: string; year: number } => {
    if (monthIndex < 0) {
      monthIndex += 12;
      year -= 1;
    }
    return { month: months[monthIndex], year };
  };

  // Find the index of the current month
  const currentMonthIndex = months.indexOf(currentMonth);

  const result: Last12MonthsDetailDataset = [];

  for (let i = 0; i < 12; i++) {
    const { month, year } = getPreviousMonthAndYear(
      currentMonthIndex - i,
      currentYear
    );

    // Filter data for the current month and year
    const filteredData = filteredDataByEstate.filter(
      (entry) => entry.year === year && entry.month === month
    );

    // Group data by detail and sum amounts, handling "Mortgage Payment" detail
    const details: { [detail: string]: number } = filteredData.reduce(
      (acc, entry) => {
        const { detail, amount, isMortgage } = entry;

        // If entry is a mortgage, add it to "Mortgage Payment" detail
        if (isMortgage) {
          acc["Mortgage Payment"] = (acc["Mortgage Payment"] || 0) + amount;
        } else {
          acc[detail] = (acc[detail] || 0) + amount;
        }

        return acc;
      },
      {} as { [detail: string]: number }
    );

    // Add the result for the current month
    result.push({ year, month, details });
  }

  return result.reverse();
};

export type DetailMonthlyData = {
  year: number; // The year of the record
  month: string; // The name of the month
  details: {
    [detail: string]: number; // The amount grouped by detail for this month
  };
};

export type Last12MonthsDetailDataset = DetailMonthlyData[];