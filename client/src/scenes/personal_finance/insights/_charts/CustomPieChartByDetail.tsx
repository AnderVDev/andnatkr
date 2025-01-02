import * as React from "react";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { ChartsClipPath } from "@mui/x-charts/ChartsClipPath";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
// import { dataset, valueFormatter } from "./datasets/Total_Income_Expenses";
import { pieArcLabelClasses, PiePlot } from "@mui/x-charts/PieChart";
import { ItemTooltip } from "../../../../components/chart/tooltip/ItemTooltip";
import { useActivitiesByUser } from "../../../../components/chart/hooks/useActivitiesByUser";
// import numeral from "numeral";
export default function CustomPieChartByDetail() {
  const id = React.useId();
  const clipPathId = `${id}-clip-path`;
  const { totalExpensesByDetail } = useActivitiesByUser();

  const palette = [
    "#2c5b87", // Deep blue
    "#cccccc", // Light gray
    "#8e44ad", // Rich purple
    "#6c3483", // Deep violet
    "#1f3b4d", // Midnight blue
    "#3a5f81", // Steel blue
    "#a0a0a0", // Medium gray
    "#5b2c6f", // Dark plum
    "#e0e0e0", // Pale gray
    "#2a4974", // Navy blue
  ];

  const data = totalExpensesByDetail || [];
  // Pie chart data
  const dataset = data.map((item: { detail: string; totalAmount: number }) => ({
    id: item.detail.toLowerCase().replace(/\s+/g, "-"), // Ensure unique, consistent ID
    label: item.detail, // Use detail as the label
    value: item.totalAmount, // Total amount for the pie chart segment
    color: "#2c5b87", // Common color for all expense categories (can be customized)
  }));

  return (
    <ResponsiveChartContainer
      colors={palette}
      height={300}
      series={[
        {
          type: "pie",
          id: "pieSeries",
          data: dataset.map((item) => ({
            id: item.id,
            value: item.value,
            label: item.label,
            // color: item.color,
          })),
          highlightScope: { fade: "global", highlight: "item" },
          paddingAngle: 0.5,
          cx: 170,
          cy: 100,
          // outerRadius: 126,
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
  );
}
