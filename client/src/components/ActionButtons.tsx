import { useTheme } from "@emotion/react";
import React from "react";
import FlexBetween from "./FlexBetween";
import { Box, IconButton } from "@mui/material";
import { Delete, SettingsOutlined } from "@mui/icons-material";

type Props = {};

const ActionButtons = ({ id, onDeleted }) => {
  const theme = useTheme();

  const handleDelete = async () => {
    console.log(`clicked ${id}`);

    const savedResponse = await fetch(
      "http://localhost:8080/api/v1/management/" + id,
      {
        method: "DELETE",
      }
    );
    onDeleted();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textTransform: "none",
        gap: "0.5rem",
      }}
    >
      <IconButton edge="end" aria-label="comments">
        <SettingsOutlined />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <Delete />
      </IconButton>
    </Box>
  );
};

export default ActionButtons;
