import { TextField, Dialog, Button } from "@mui/material";
import * as React from "react";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";

export const UpdateCustomer = ({idUpdate, load, setLoad}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consultCustomerById = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/customer/consultar-cliente-por-id/${id}`);
    setFormData(response.data.customer);
  };

  React.useEffect(() => {
    if (idUpdate) {
      consultCustomerById(idUpdate);
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
          name: formData.name || "",
          document_number: formData.document_number || "",
          email: formData.email || "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Este campo es obligatorio"),
          document_number: Yup.number().required("Este campo es obligatorio"),
          email: Yup.string()
            .required("Este campo es obligatorio")
            .email("Dirección de correo no valida"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await axios.put(
            `${
              import.meta.env.VITE_URL_SERVER
            }api/customer/modificar-cliente`,
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
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="container_form container_form_popup">
              <div className="title">
                <h3 className="title_form">Actualización de Cliente</h3>
                <UpdateIcon
                  aria-label="Actualizar"
                  sx={{ fontSize: 50 }}
                ></UpdateIcon>
              </div>

              <TextField
                className="input"
                id="name"
                name="name"
                label="Nombre"
                onChange={handleChange}
                value={values.name}
                error={errors.name}
                helperText={errors.name}
              />
              <TextField
                className="input"
                id="document_number"
                name="document_number"
                label="Número de documento"
                onChange={handleChange}
                value={values.document_number}
                error={errors.document_number}
                helperText={errors.document_number}
              />
              <TextField
                className="input"
                id="email"
                name="email"
                label="Correo eletrónico"
                onChange={handleChange}
                value={values.email}
                error={errors.email}
                helperText={errors.email}
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
