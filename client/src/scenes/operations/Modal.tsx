import { useState } from "react";
import {
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Theme,
} from "@mui/material";
import {
  CloseOutlined,
  AddCircleOutlineOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import TransactionForm from "../../components/TransactionForm";

interface ModalRealEstateProps{
  modalType: string;
  row: unknown;
}

const BootstrapDialog = styled(Dialog)(({ theme } : {theme : Theme}) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ModalRealEstate = ({ modalType, row } : ModalRealEstateProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        {modalType === "update" ? (
          <SettingsOutlined sx={{ fontSize: "1.5rem" }} />
        ) : (
          <AddCircleOutlineOutlined sx={{ fontSize: "1.5rem" }} />
        )}
      </IconButton>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          New
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseOutlined />
        </IconButton>
        <DialogContent dividers>
          <TransactionForm
            onClosed={handleClose}
            modalType={modalType}
            row={row}
          />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default ModalRealEstate;
