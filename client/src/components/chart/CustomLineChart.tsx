import * as React from "react";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsClipPath } from "@mui/x-charts/ChartsClipPath";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
// import { dataset } from "./datasets/Total_Income_Expenses";
import { LineHighlightPlot, LinePlot } from "@mui/x-charts";
import { LineCharTooltip } from "./tooltip/LineCharTooltip";
import { useTransactionsSummary } from "./hooks/useTransactionsSummary";
interface CustomLineChartProps {
  detail: string; // Accept the selected detail as a prop
}
export default function CustomTooltipPosition({
  detail,
}: CustomLineChartProps) {
  const id = React.useId();
  const clipPathId = `${id}-clip-path`;
  const { total12MonthsByDetail } = useTransactionsSummary();

 // Map the selected `detail` to its data across months
 const filteredData = total12MonthsByDetail
 ? total12MonthsByDetail.map((item) => ({
     month: item.month,
     value: item.details[detail] || 0, // Use the value for the selected detail, or 0 if not found
   }))
 : [];
  
 const data = filteredData.length > 0 ? filteredData : [];

  return (
    <ResponsiveChartContainer
      height={400}
      dataset={data}
      series={[
        {
          type: "line",
          dataKey: "value",
          label: "Income",
          color: "#2c5b87",
          highlightScope: { fade: 'global', highlight: 'item' },
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
        <LinePlot />
      </g>
      {/* Tooltip integration */}
      {/* <ChartsTooltip
        trigger="axis" // Tooltip triggers on item hover
      /> */}

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

      {/* <ChartsAxisHighlight
        x="line"
        y="line"  
      /> */}

      <LineHighlightPlot
        slotProps={{
          lineHighlight: {
            style: {
              fill: "#CCCCCC",
            },
          },
        }}
      />

      <LineCharTooltip />

      <ChartsClipPath id={clipPathId} />
    </ResponsiveChartContainer>
  );
}
