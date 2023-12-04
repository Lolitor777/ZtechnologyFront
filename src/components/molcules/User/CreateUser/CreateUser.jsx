import {
  TextField,
  InputLabel,
  Box,
  FormControl,
  NativeSelect,
  Button,
} from "@mui/material";
import * as React from "react";
import { Formik } from "formik";
import "@styles/CreateStyle.css";
import axios from "axios";
import * as Yup from "yup";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const CreateUser = (load, setLoad) => {
  const [rol, setRol] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = () => {
    setOpen(false)
  };

  const handleChange = (event) => {
    setRol(event.target.value);
  };

  return (
    <div>
      <Formik
        initialValues={{
          names: "",
          nameUser: "",
          email: "",
          password: "",
          rol: "",
        }}
        validationSchema={Yup.object ({
          names: Yup.string()
                .required('Este campo es obligatorio'),
          nameUser: Yup.string()
                .required('Este campo es obligatorio'),
          email: Yup.string()
                .required('Este campo es obligatorio')
                .email('Dirección de correo no valida'),
          password: Yup.string()
                .required('Este campo es obligatorio')
                .min(8, 'Digite por lo menos 8 caracteres'),
          id_rol: Yup.string()
                .required('Este campo es obligatorio')
                .max(1, 'Digite 1 para Admin y 2 para gestor')
        })}

        onSubmit={async(values, { setSubmitting }) => {
          const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}api/user/guardar-usuarios`, values);
          console.log(response);
          setLoad(!load)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting, 
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="container_form">
              <div className="title">
                <h3 className="title_form">Crea un usuario</h3>
                <AccountCircleIcon 
                aria-label="icono de usuario"
                sx={{ fontSize: 50 }}>
                </AccountCircleIcon>
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
                className="password input"
                id="password"
                name="password"
                label="Contraseña"
                onChange={handleChange}
                value={values.password}
                error={errors.password}
                helperText={errors.password}
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
                    Crear
                </Button>
              </div>
              
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default CreateUser;
