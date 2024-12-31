import * as React from "react";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { ChartsClipPath } from "@mui/x-charts/ChartsClipPath";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
// import { dataset, valueFormatter } from "./datasets/Total_Income_Expenses";
import { pieArcLabelClasses, PiePlot } from "@mui/x-charts/PieChart";
import { ItemTooltip } from "./tooltip/ItemTooltip";

export default function CustomPieChart() {
  const id = React.useId();
  const clipPathId = `${id}-clip-path`;

  // Pie chart data
  const datasetTest = [
    { id: "income", label: "Income", value: 4000, color: "#2c5b87" },
    { id: "expenses", label: "Expenses", value: 3000, color: "#d1d4dc" },
  ];

  return (
    <ResponsiveChartContainer
      height={300}
      series={[
        {
          type: "pie",
          id: "pieSeries",
          data: datasetTest.map((item) => ({
            id: item.id,
            value: item.value,
            label: item.label,
            color: item.color,
          })),
          arcLabel: "label",
          arcLabelMinAngle: 35,
          arcLabelRadius: "50%",
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "#fff",
        },
      }}
    >
      <g clipPath={`url(#${clipPathId})`}>
        <PiePlot margin={{ top: 100, bottom: 100, left: 100, right: 100 }} />
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
