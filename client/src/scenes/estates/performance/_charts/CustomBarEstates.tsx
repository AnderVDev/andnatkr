import * as React from "react";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsClipPath } from "@mui/x-charts/ChartsClipPath";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
import { ItemTooltip } from "../../../../components/chart/tooltip/ItemTooltip";
import { useOperationsEstates } from "../../../../components/chart/hooks/useOperationsEstates";

interface CustomBarEstatesProps {
  estate: string; // Accept the selected detail as a prop
}
export default function CustomBarEstates({ estate }: CustomBarEstatesProps) {
  const id = React.useId();
  const clipPathId = `${id}-clip-path`;
  const { total12Months } = useOperationsEstates(estate);
  // const data = realEstateTransactions;

  // const dataset12Months = accumulatorLast12Months(data, estate);

  const dataset = total12Months || [];

  return (
    <ResponsiveChartContainer
      height={400}
      dataset={dataset}
      series={[
        {
          type: "bar",
          dataKey: "totalIncome",
          label: "Income",
          color: "#2c5b87",
        },
        {
          type: "bar",
          dataKey: "totalExpenses",
          label: "Expenses",
          color: "#d1d4dc",
        },
      ]}
      xAxis={[
        {
          scaleType: "band",
          dataKey: "month",
        },
      ]}
    >
      <g clipPath={`url(#${clipPathId})`}>
        <BarPlot />
      </g>
      <ChartsLegend
        slotProps={{
          legend: {
            labelStyle: {
              fontSize: 14,
              fontWeight: "bold",
              fill: "#ffff",
            },
          },
        }}
      />
      <ChartsXAxis
        slotProps={{
          axisLine: { style: { stroke: "#fff", strokeWidth: 1 } }, // Change axis line color and width
          axisTick: { style: { stroke: "#CCCCCC" } }, // Tick color
          axisTickLabel: {
            style: {
              fill: "#CCCCCC",
              fontSize: 12,
              fontWeight: "bold",
              textAnchor: "start",
              angle: 30,
            },
          }, // Tick label color and font size
        }}
      />
      <ChartsYAxis
        slotProps={{
          axisLine: { style: { stroke: "#fff", strokeWidth: 1 } }, // Change axis line color and width
          axisTick: { style: { stroke: "#CCCCCC" } }, // Tick color
          axisTickLabel: {
            style: { fill: "#CCCCCC", fontSize: 12, fontWeight: "bold" },
          }, // Tick label color and font size
        }}
      />

      <ItemTooltip />
      <ChartsClipPath id={clipPathId} />
    </ResponsiveChartContainer>
  );
}
