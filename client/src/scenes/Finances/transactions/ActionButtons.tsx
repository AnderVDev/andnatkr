import FlexBetween from "../../../components/FlexBetween";
import { Box, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import ModalTransaction from "./Modal";
import { useDeleteTransactionMutation } from "../../../state/api";

interface buttonsProps {
  modalType: string;
  row: { id: number };
}

const ActionButtons = ({ modalType, row }: buttonsProps) => {
  const [deleteInput] = useDeleteTransactionMutation();

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
        <ModalTransaction modalType={modalType} row={row} />
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </FlexBetween>
    </Box>
  );
};

export default ActionButtons;
