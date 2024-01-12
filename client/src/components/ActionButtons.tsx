import { useTheme } from "@emotion/react";
import React from "react";
import FlexBetween from "./FlexBetween";
import { Box, IconButton } from "@mui/material";
import { Delete, SettingsOutlined } from "@mui/icons-material";
import ModalRealEstate from "../scenes/operations/Modal";
import { useDeleteEstateMgmtMutation } from "../state/api";

type Props = {};

const ActionButtons = ({ onUpdated, modalType, row }) => {
  const theme = useTheme();
  const [deleteInput] = useDeleteEstateMgmtMutation();

  const handleDelete = async () => {
      deleteInput(row.id);
    // console.log(`clicked ${row.id}`);
    // onUpdated();
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
      <ModalRealEstate onUpdated={onUpdated} modalType={modalType} row={row} />
      {/* <IconButton >
        <SettingsOutlined />
      </IconButton> */}
      <IconButton onClick={handleDelete}>
        <Delete />
      </IconButton>
    </Box>
  );
};

export default ActionButtons;
