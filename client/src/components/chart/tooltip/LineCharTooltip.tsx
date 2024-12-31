import NoSsr from "@mui/material/NoSsr";
import Popper from "@mui/material/Popper";
import { useAxisTooltip, useMouseTracker } from "@mui/x-charts/ChartsTooltip";
// import { useItemTooltip, useMouseTracker } from "@mui/x-charts/ChartsTooltip";
import { CustomLineTooltipContent } from "./CustomLineContent";
import { generateVirtualElement } from "./generateVirtualElement";
import { useEffect, useState } from "react";

export function LineCharTooltip() {
  const tooltipData = useAxisTooltip();
  const mousePosition = useMouseTracker(); // Track the mouse position on chart.
  const [color, setColor] = useState<string>("#fff");
  const [label, setLabel] = useState<string | undefined>("None");
  const [value, setValue] = useState<string>("0");
  // console.log("tooltipData:", tooltipData);
  // console.log("mousePosition:", mousePosition);

  useEffect(() => {
    if (tooltipData) {
      setLabel(tooltipData.axisFormattedValue)
      const { seriesItems } = tooltipData;
      if (seriesItems && seriesItems.length > 0) {
        setColor(seriesItems[0].color);
        setValue(seriesItems[0].formattedValue);
        // if(seriesItems[0].formattedLabel){
        //   setLabel(seriesItems[0].formattedLabel);
        // }

        // Optional: You can log the values for debugging
        // seriesItems.forEach((item) => {
        //   console.log("Color:", item.color);
        //   console.log("Label:", item.formattedLabel);
        //   console.log("Value:", item.formattedValue);
        // });
      }
    }
  }, [tooltipData]); // Runs only when tooltipData changes

  if (!tooltipData || !mousePosition) {
    // No data to display
    return null;
  }

  // The pointer type can be used to have different behavior based on pointer type.
  const isMousePointer = mousePosition?.pointerType === "mouse";
  // Adapt the tooltip offset to the size of the pointer.
  const yOffset = isMousePointer ? 0 : 40 - mousePosition.height;

  // Generate virtual element for Popper positioning based on the mouse position
  const virtualElement = generateVirtualElement(mousePosition);

  return (
    <NoSsr>
      <Popper
        sx={{
          pointerEvents: "none",
          zIndex: (theme) => theme.zIndex.modal,
        }}
        open
        placement={isMousePointer ? "top-end" : "top"}
        anchorEl={virtualElement}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, yOffset],
            },
          },
        ]}
      >
        <CustomLineTooltipContent
          color={color}
          label={label}
          formattedValue={value}
        />
        {/* <CustomLineTooltipContent {...tooltipData} /> */}
      </Popper>
    </NoSsr>
  );
}
