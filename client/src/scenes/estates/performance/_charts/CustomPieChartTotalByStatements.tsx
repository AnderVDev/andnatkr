import * as React from "react";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { ChartsClipPath } from "@mui/x-charts/ChartsClipPath";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
import { pieArcLabelClasses, PiePlot } from "@mui/x-charts/PieChart";
import { ItemTooltip } from "../../../../components/chart/tooltip/ItemTooltip";

import { useOperationsEstates } from "../../../../components/chart/hooks/useOperationsEstates";
interface CustomPieChartTotalByStatementsProps {
  estate: string; // Accept the selected detail as a prop
}
export default function CustomPieChartTotalByStatements({
  estate,
}: CustomPieChartTotalByStatementsProps) {
  const id = React.useId();
  const clipPathId = `${id}-clip-path`;

  const { totalIncomes, totalExpenses} = useOperationsEstates(estate);

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
    <ResponsiveChartContainer
      height={300}
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
          cx: 200,
          cy: 100,
          //  arcLabel: (item) => numeral(item.value).format("0,0.00"),
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
