import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { UseItemTooltipReturnValue } from "@mui/x-charts/ChartsTooltip";
import { ChartSeriesType } from "@mui/x-charts/internals";

/**
 * Render a basic tooltip content for an item.
 */
export function CustomItemTooltipContent(
  props: Pick<
    UseItemTooltipReturnValue<ChartSeriesType>,
    "color" | "label" | "formattedValue"
  >
) {
  return (
    <Paper
      elevation={0}
      sx={{
        m: 1,
        p: 1.5,
        border: "solid",
        borderWidth: 2,
        borderColor: "divider",
      }}
    >
      <Stack direction="row" alignItems="center">
        <div
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            backgroundColor: props.color,
          }}
        />
        <Typography sx={{ ml: 2 }} fontWeight="light">
          {props.label}
        </Typography>
        <Typography sx={{ ml: 2 }}>{props.formattedValue}</Typography>
      </Stack>
    </Paper>
  );
}
