/* eslint-disable @typescript-eslint/no-explicit-any */
import FlexBetween from "../../../../components/FlexBetween";
import { Box, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDeleteGoalMutation } from "../../../../state/api";
import Modal from "./Modal";

interface buttonsProps {
  modalType: string;
  row: any;
}

const ActionButtons = ({ modalType, row }: buttonsProps) => {
  const [deleteInput] = useDeleteGoalMutation();

  const handleDelete = async () => {
    deleteInput(row.id);
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
      <FlexBetween>
        <Modal modalType={modalType} row={row} />
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </FlexBetween>
    </Box>
  );
};

export default ActionButtons;
