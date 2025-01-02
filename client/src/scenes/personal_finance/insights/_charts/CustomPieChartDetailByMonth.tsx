import * as React from "react";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { ChartsClipPath } from "@mui/x-charts/ChartsClipPath";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
// import { dataset, valueFormatter } from "./datasets/Total_Income_Expenses";
import { pieArcLabelClasses, PiePlot } from "@mui/x-charts/PieChart";
import { ItemTooltip } from "../../../../components/chart/tooltip/ItemTooltip";
import { useActivitiesByUser } from "../../../../components/chart/hooks/useActivitiesByUser";
// import numeral from "numeral";
import { Box, MenuItem, TextField, useTheme } from "@mui/material";
import { CustomTheme } from "../../../../theme";
import {
  currentMonth,
  currentYear,
  months,
  transactionDetails,
  years,
} from "../../../../dataUtil";
import numeral from "numeral";


export default function CustomPieChartDetailByMonth() {
  const theme = useTheme<CustomTheme>();
  const id = React.useId();
  const clipPathId = `${id}-clip-path`;
  const { totalDetailsByMonth } = useActivitiesByUser();

  const [selectedDetail, setSelectedDetail] = React.useState<string>("Salary");
  const handleDetailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDetail(event.target.value); // Update state with selected value
  };

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

  // Filter transactions by selected year and month
  const filteredTransactions = totalDetailsByMonth.filter(
    (transaction) =>
      transaction.year === parseInt(selectedYear) &&
      transaction.month === selectedMonth
  );

  // Extract the total for the selected detail
  const selectedDetailTotal =
    filteredTransactions.length > 0
      ? filteredTransactions[0].details[selectedDetail] || 0
      : 0;

  // Pie chart data
  const dataset = [
    {
      id: selectedDetail,
      label: selectedDetail,
      value: selectedDetailTotal,
      color: "#2c5b87", // Color for income
    },
  ];

  return (
    <Box display="flex" paddingBottom={10} paddingRight={1}>
      <Box display="flex" flexDirection="column">
        <TextField
          id="detail"
          select
          label="Detail"
          value={selectedDetail} // Control the TextField value with state
          onChange={handleDetailChange} // Update state on change
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
          {transactionDetails.map((option, index) => (
            <MenuItem key={`${option}-${index}`} value={option}>
              {" "}
              {/* Unique key by combining option and index */}
              {option}
            </MenuItem>
          ))}
        </TextField>
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
            arcLabel: (item) => numeral(item.value).format("0,0.00"),
            // arcLabel: "value",
            arcLabelMinAngle: 35,
            arcLabelRadius: "50%",
            cx: 130,
            cy: 88,
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
