import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import axios from "axios";
import Swal from 'sweetalert2'

export const DeleteQuote = ({idDelete, load, setLoad}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const response = await axios.delete(`${import.meta.env.VITE_URL_SERVER}api/quote/eliminar-cotizacion/${idDelete}`)
    console.log(response.data.msg);
    setLoad(!load);
    setOpen(false);

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: response.data.msg
      });
}

useEffect(() => {
    setOpen(idDelete ? true : false)
}, [idDelete]) 

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"¿Deseas eliminar esta cotización?"}
      </DialogTitle>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button type="submit" variant="contained" color="error" onClick={handleDelete}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
