/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Form from "./Form";

interface ModalMortgageProps {
  modalType: string;
  row: any;
}

const BootstrapDialog = styled(Dialog)(({ theme }: { theme: Theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ModalMortgages = ({ modalType, row }: ModalMortgageProps) => {
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
          <Form onClosed={handleClose} modalType={modalType} row={row} />
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default ModalMortgages;
