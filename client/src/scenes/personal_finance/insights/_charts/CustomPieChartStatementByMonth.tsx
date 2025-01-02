import * as React from "react";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { ChartsClipPath } from "@mui/x-charts/ChartsClipPath";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
import { pieArcLabelClasses, PiePlot } from "@mui/x-charts/PieChart";
import { ItemTooltip } from "../../../../components/chart/tooltip/ItemTooltip";
import { Box, MenuItem, TextField, useTheme } from "@mui/material";
import { CustomTheme } from "../../../../theme";
import { currentMonth, currentYear, months, years } from "../../../../dataUtil";
import { useActivitiesByUser } from "../../../../components/chart/hooks/useActivitiesByUser";

export default function CustomPieChartStatementByMonth() {
  const theme = useTheme<CustomTheme>();
  const id = React.useId();
  const clipPathId = `${id}-clip-path`;
  const { totalStatementsByMonth } = useActivitiesByUser();

  const [selectedMonth, setSelectedMonth] =
    React.useState<string>(currentMonth);
  const handleMonthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMonth(event.target.value); // Update state with selected value
  };

  const [selectedYear, setSelectedYear] = React.useState<string>(
    String(currentYear)
  );
  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedYear(event.target.value); // Update state with selected value
  };

  // Filter the transactions based on the selected month and year
  const filteredTransactions = totalStatementsByMonth.filter(
    (transaction) =>
      transaction.year === parseInt(selectedYear) &&
      transaction.month === selectedMonth
  );

  const totalIncomes =
    filteredTransactions.length > 0 ? filteredTransactions[0].totalIncome : 0;

  const totalExpenses =
    filteredTransactions.length > 0 ? filteredTransactions[0].totalExpenses : 0;

  // Pie chart data
  const dataset = [
    {
      id: "income",
      label: "Income",
      value: totalIncomes,
      color: "#2c5b87", // Color for income
    },
    {
      id: "expenses",
      label: "Expenses",
      value: totalExpenses,
      color: "#d1d4dc", // Color for expenses
    },
  ];

  return (
    <Box display="flex" paddingBottom={10} paddingRight={1}>
      <Box display="flex" flexDirection="column">
        <TextField
          id="month"
          select
          label="Month"
          value={selectedMonth} // Control the TextField value with state
          onChange={handleMonthChange} // Update state on change
          // helperText="Please select a detail"
          sx={{
            color: theme.palette.secondary.light,
            marginTop: 2,
            marginLeft: 2,
            display: "flex",
            // justifyContent: "flex-start",
            width: "100%",
          }}
        >
          {months.map((option, index) => (
            <MenuItem key={`${option}-${index}`} value={option}>
              {" "}
              {/* Unique key by combining option and index */}
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="year"
          select
          label="Year"
          value={selectedYear} // Control the TextField value with state
          onChange={handleYearChange} // Update state on change
          // helperText="Please select a detail"
          sx={{
            color: theme.palette.secondary.light,
            marginTop: 2,
            marginLeft: 2,
            display: "flex",
            // justifyContent: "flex-start",
            width: "100%",
          }}
        >
          {years.map((option, index) => (
            <MenuItem key={`${option}-${index}`} value={option}>
              {" "}
              {/* Unique key by combining option and index */}
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      <ResponsiveChartContainer
        height={275}
        margin={{ right: 150 }}
        series={[
          {
            type: "pie",
            id: "pieSeries",
            data: dataset.map((item) => ({
              id: item.id,
              value: item.value,
              label: item.label,
              color: item.color,
            })),
            highlightScope: { fade: "global", highlight: "item" },
            paddingAngle: 0.5,
            cx: 130,
            cy: 88,
            // arcLabel: (item) => numeral(item.value).format("0,0.00"),
            // arcLabel: "value",
            // arcLabelMinAngle: 35,
            // arcLabelRadius: "50%",
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "#fff",
          },
        }}
      >
        <g clipPath={`url(#${clipPathId})`}>
          <PiePlot />
        </g>
        <ChartsLegend
          direction="column"
          position={{ horizontal: "right", vertical: "middle" }}
          slotProps={{
            legend: {
              labelStyle: {
                fontSize: 14,
                fontWeight: "bold",
                fill: "#ffff",
                padding: -20,
              },
            },
          }}
        />

        <ItemTooltip />
        <ChartsClipPath id={clipPathId} />
      </ResponsiveChartContainer>
    </Box>
  );
}
