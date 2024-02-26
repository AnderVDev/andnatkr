export const financeStatementsData = ["Income", "Expense"];

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

export const currentMonth = months[new Date().getMonth()];
export const currentYear = new Date().getFullYear();

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
