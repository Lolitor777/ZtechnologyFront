import { TextField, Button } from "@mui/material";
import * as React from "react";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2'

export const ChangePassword = ({ load, setLoad }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const user = useSelector((state) => state.auth.user);
  let id = user.id;

  const consultUserById = async (id) => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_URL_SERVER
      }api/user/consultar-usuario-por-id/${id}`
    );
    setFormData(response.data.user);
    console.log(response);
  };

  const alert = () => {
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
      title: 'La contraseña se modificó correctamente!'
    });
  }

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          id: id,
          password: formData.password || "",
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .required("Este campo es obligatorio")
            .min(8, "La contraseña debe tener mínimo 8 caracteres"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await axios.put(
            `${import.meta.env.VITE_URL_SERVER}api/user/cambiar-contrasenia`,
            values
          );
          console.log(response);
          setLoad(!load);
          setOpen(false);
        }}
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="container_form">
              <div className="title">
                <h3 className="title_form">Cambiar contraseña</h3>
                <UpdateIcon
                  aria-label="Actualizar"
                  sx={{ fontSize: 50 }}
                ></UpdateIcon>
              </div>
              <TextField
                className="input"
                id="password"
                name="password"
                label="Contraseña"
                onChange={handleChange}
                value={values.password}
                error={errors.password}
                helperText={errors.password}
              />

              <div className="btn_container">
                <Button type="submit" disabled={isSubmitting} id="submit" onClick={() => {alert()}}>
                  Cambiar
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
