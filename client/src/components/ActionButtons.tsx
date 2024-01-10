import { useTheme } from "@emotion/react";
import React from "react";
import FlexBetween from "./FlexBetween";
import { Box, IconButton } from "@mui/material";
import { DeleteOutlineOutlined, SettingsOutlined } from "@mui/icons-material";

type Props = {};

const ActionButtons = (props: Props) => {
  const theme = useTheme();

  return (
    <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textTransform: "none",
        gap: "0.5rem",
      }}>        
    
      <IconButton edge="end" aria-label="comments" >
        <SettingsOutlined />
      </IconButton>
      <IconButton edge="end" aria-label="comments">
        <DeleteOutlineOutlined />
      </IconButton>
   
    </Box>
  );
};

export default ActionButtons;
