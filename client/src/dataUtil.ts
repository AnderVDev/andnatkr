export const financeStatementsData: string[] = ["Income", "Expense"];
export const years: string[] = [
  "2023",
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
];
const currentDate: Date = new Date();
export const currentYear: number = currentDate.getFullYear();
export const numberCurrentMonth: number = currentDate.getMonth();
export const months: string[] = [
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
export const currentMonth: string = months[numberCurrentMonth];
export const previousMonth: string =
  numberCurrentMonth != 0 ? months[numberCurrentMonth - 1] : months[11];
export const previousYear: number =
  numberCurrentMonth != 0 ? currentYear : currentYear - 1;

export const details: { [key: string]: string[] } = {
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
