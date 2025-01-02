/* eslint-disable @typescript-eslint/no-explicit-any */
import { currentMonth, currentYear, months } from "./dataUtil";



export const dataByUser = (
  data: any[],
  user_id: string
) => {
  return data
    .filter((transaction) => transaction.user_id === user_id)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};


export const filterByKey = (data: any[], key: string | number, value: any) => {
  const filteredData = data
    ? data.filter((entry: { [x: string]: any }) => entry[key] === value)
    : [];
  return filteredData;
};

export const accumulatorByTotalAmount = (
  data: any,
  key: string,
  value: string
) => {
  const filteredData = data ? filterByKey(data, key, value) : [];
  return filteredData.reduce((accumulator: any, entry: { amount: any }) => {
    return accumulator + entry.amount;
  }, 0);
};




// ***************** Insights **************************************

export const accumulatorTotalExpensesByDetailGrouped = (data: any[]) => {
  // Filter data to include only "Expense" records
  const filteredData = data.filter(
    (entry) => entry.financeStatement === "Expense"
  );

  // Group the filtered data by the detail and accumulate amounts
  const groupedExpenses = filteredData.reduce((acc, entry) => {
    const { detail, amount } = entry;
    if (acc[detail]) {
      acc[detail] += amount;
    } else {
      acc[detail] = amount;
    }
    return acc;
  }, {} as Record<string, number>);

  // Convert the grouped data to the desired output format
  return Object.entries(groupedExpenses).map(([detail, totalAmount]) => ({
    detail,
    totalAmount,
  }));
};

export const accumulatorLast12Months = (data: any[]) => {
  // Helper function to calculate total for a given month/year and statement type
  const calculateTotal = (
    data: any[],
    year: number,
    month: string,
    financeStatement: string
  ) => {
    const filteredData = data.filter(
      (entry) =>
        entry.year === year &&
        entry.month === month &&
        entry.financeStatement === financeStatement
    );

    return filteredData.reduce((total, entry) => total + entry.amount, 0);
  };

  // Prepare dataset for the last 12 months
  const dataset = [];
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

// ________________
export type DetailMonthlyData = {
  year: number; // The year of the record
  month: string; // The name of the month
  details: {
    [detail: string]: number; // The amount grouped by detail for this month
  };
};

export type Last12MonthsDetailDataset = DetailMonthlyData[];

export const accumulatorLast12MonthsByDetail = (data: any[]) => {
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
    const filteredData = data.filter(
      (entry) => entry.year === year && entry.month === month
    );

    // Group data by detail and sum amounts
    const details: { [detail: string]: number } = filteredData.reduce(
      (acc, entry) => {
        const { detail, amount } = entry;
        acc[detail] = (acc[detail] || 0) + amount;
        return acc;
      },
      {} as { [detail: string]: number }
    );

    // Add the result for the current month
    result.push({ year, month, details });
  }

  return result.reverse();
};

export const accumulatorTotalStatementsByMonth = (data: any[]) => {
  const totalIncomeAndExpensesData = data.reduce((acc, transaction) => {
    const { year, month, amount, financeStatement } = transaction;
    const key = `${year}-${month}`;

    // Initialize the entry for the year-month if not already present
    if (!acc[key]) {
      acc[key] = {
        year,
        month,
        totalIncome: 0,
        totalExpenses: 0,
      };
    }

    // Accumulate income and expenses separately
    if (financeStatement === "Income") {
      acc[key].totalIncome += amount;
    } else if (financeStatement === "Expense") {
      acc[key].totalExpenses += amount;
    }

    return acc;
  }, {} as { [key: string]: { year: number; month: string; totalIncome: number; totalExpenses: number } });

  // Convert the accumulated data into an array and return it
  return Object.values(totalIncomeAndExpensesData);
};

export const accumulatorTotalDetailsByMonth = (data: any[]) => {
  const totalDetailsData = data.reduce((acc, transaction) => {
    const { year, month, amount, detail } = transaction;
    const key = `${year}-${month}`;

    // Initialize the entry for the year-month if not already present
    if (!acc[key]) {
      acc[key] = {
        year,
        month,
        details: {},
      };
    }

    // Accumulate the amount under the correct category
    acc[key].details[detail] = (acc[key].details[detail] || 0) + amount;

    return acc;
  }, {} as { [key: string]: { year: number; month: string; details: { [key: string]: number } } });

  // Convert the accumulated data into an array and return it
  return Object.values(totalDetailsData);
};

// *********************************************************
