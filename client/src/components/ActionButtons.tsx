import FlexBetween from "./FlexBetween";
import { Box, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import ModalRealEstate from "../scenes/estates/operations/Modal";
import { useDeleteEstateMgmtMutation } from "../state/api";

interface buttonsProps {
  modalType: string;
  row: { id: number };
}

const ActionButtons = ({ modalType, row }: buttonsProps) => {
  const [deleteInput] = useDeleteEstateMgmtMutation();

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
        <ModalRealEstate modalType={modalType} row={row} />
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </FlexBetween>
    </Box>
  );
};

export default ActionButtons;
