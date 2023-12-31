import { TextField, Dialog, Button } from "@mui/material";
import * as React from "react";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";

export const UpdateUser = ({idUpdate, load, setLoad}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consultUserById = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/user/consultar-usuario-por-id/${id}`);
    setFormData(response.data.user);
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
          names: formData.names || "",
          nameUser: formData.nameUser || "",
          email: formData.email || "",
          rol: formData.id_rol || "",
        }}
        validationSchema={Yup.object({
          names: Yup.string().required("Este campo es obligatorio"),
          nameUser: Yup.string().required("Este campo es obligatorio"),
          email: Yup.string()
            .required("Este campo es obligatorio")
            .email("Dirección de correo no valida"),
          id_rol: Yup.string()
            .required("Este campo es obligatorio")
            .max(1, "Digite 1 para Admin y 2 para gestor"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await axios.put(
            `${
              import.meta.env.VITE_URL_SERVER
            }api/user/modificar-datos-a-gestores`,
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
                <h3 className="title_form">Actualización de usuario</h3>
                <UpdateIcon
                  aria-label="Actualizar"
                  sx={{ fontSize: 50 }}
                ></UpdateIcon>
              </div>

              <TextField
                className="names input"
                id="names"
                name="names"
                label="Nombres"
                onChange={handleChange}
                value={values.names}
                error={errors.names}
                helperText={errors.names}
              />
              <TextField
                className="nameUser input"
                id="nameUser"
                name="nameUser"
                label="Nombre de usuario"
                onChange={handleChange}
                value={values.nameUser}
                error={errors.nameUser}
                helperText={errors.nameUser}
              />
              <TextField
                className="email input"
                id="email"
                name="email"
                label="Correo eletrónico"
                onChange={handleChange}
                value={values.email}
                error={errors.email}
                helperText={errors.email}
              />
              <TextField
                className="input"
                id="id_rol"
                name="id_rol"
                label="Rol"
                onChange={handleChange}
                value={values.id_rol}
                error={errors.id_rol}
                helperText={errors.id_rol}
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
