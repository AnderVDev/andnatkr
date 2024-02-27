export const financeStatementsData = ["Income", "Expense"];
export const currentYear = new Date().getFullYear();
export const numberCurrentMonth = new Date().getMonth();
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const currentMonth = months[numberCurrentMonth];
export const previousMonth = numberCurrentMonth != 0 ? months[numberCurrentMonth -1] : months[11];
export const previousYear = numberCurrentMonth != 0 ? currentYear : currentYear - 1;
// export const testPreviousMonth = false ? months[numberCurrentMonth -1] : months[11];
// export const testPreviousYear = false? currentYear : currentYear - 1;

export const details = {
  Income: ["Salary", "Other"],
  Expense: [
    "Entertainment",
    "Grocery",
    "Insurance",
    "Other",
    "Rent",
    "Subscription",
    "Utility",
    "Saving",
  ],
};
