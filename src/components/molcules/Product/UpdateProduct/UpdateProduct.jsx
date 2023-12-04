import { TextField, Dialog, Button } from "@mui/material";
import * as React from "react";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";

export const UpdateProduct = ({idUpdate, load, setLoad}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consultUserById = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/product/consultar-producto-por-id/${id}`);
    setFormData(response.data.product);
    console.log('formdata', formData);
  };

  React.useEffect(() => {
    if (idUpdate) {
      consultUserById(idUpdate);
    }
    setOpen(idUpdate ? true : false);
  }, [idUpdate]);

  return (
    <Dialog 
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Formik
        enableReinitialize
        initialValues={{
          id: idUpdate,
          type: formData.type || "",
          description: formData.description || "",
          price: formData.price || "",
          amount: formData.amount || "",
        }}
        validationSchema={Yup.object({
          type: Yup.string().required("Este campo es obligatorio"),
          description: Yup.string().required("Este campo es obligatorio"),
          price: Yup.number()
            .required("Este campo es obligatorio"),
          amount: Yup.number()
            .required("Este campo es obligatorio")
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await axios.put(
            `${
              import.meta.env.VITE_URL_SERVER
            }api/product/modificar-producto`,
            values
          );
          setLoad(!load);
          setOpen(false);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="container_form container_form_popup">
              <div className="title">
                <h3 className="title_form">Actualización de producto</h3>
                <UpdateIcon
                  aria-label="Actualizar"
                  sx={{ fontSize: 50 }}
                ></UpdateIcon>
              </div>

              <TextField
                className="input"
                id="type"
                name="type"
                label="Tipo"
                onChange={handleChange}
                value={values.type}
                error={errors.type}
                helperText={errors.type}
              />
              <TextField
                className="input"
                id="description"
                name="description"
                label="Descripción"
                onChange={handleChange}
                value={values.description}
                error={errors.description}
                helperText={errors.description}
              />
              <TextField
                className="input"
                id="price"
                name="price"
                label="Precio"
                onChange={handleChange}
                value={values.price}
                error={errors.price}
                helperText={errors.price}
              />
              <TextField
                className="input"
                id="amount"
                name="amount"
                label="Cantidad"
                onChange={handleChange}
                value={values.amount}
                error={errors.amount}
                helperText={errors.amount}
              />

              <div className="btn_container">
                <Button type="submit" disabled={isSubmitting} id="submit">
                  Actualizar
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
