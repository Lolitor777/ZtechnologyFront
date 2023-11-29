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
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import UpdateIcon from '@mui/icons-material/Update';

export const UpdateUser = (idUpdate, load, setLoad) => {
  const [rol, setRol] = React.useState("");
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    setRol(event.target.value);
  };

  const consultUserById = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/user/consultar-usuario-por-id/${id}`)
    console.log(response.data.user);
    setFormData(response.data.user);
}

React.useEffect(() => {
    if (idUpdate) {
        consultUserById(idUpdate)
    }
},[idUpdate])

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          id: idUpdate,
          names: formData.names || "",
          nameUser: formData.nameUser || "",
          email: formData.email || "",
          password: formData.password || "",
          rol: formData.rol || "",
        }}
        validationSchema={Yup.object({
          names: Yup.string().required("Este campo es obligatorio"),
          nameUser: Yup.string().required("Este campo es obligatorio"),
          email: Yup.string()
            .required("Este campo es obligatorio")
            .email("Dirección de correo no valida"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await axios.put(
            `${import.meta.env.VITE_URL_SERVER}api/user/modificar-datos-a-gestores`, values);
          console.log(response.data.msg);
          setLoad(!load);
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
                <h3 className="title_form">Actualización de usuario</h3>
                <UpdateIcon
                aria-label="Actualizar" 
                sx={{fontSize: 50}}>

                </UpdateIcon>
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

              <Box sx={{ maxWidth: 400 }} className="option_rol">
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Rol
                  </InputLabel>
                  <NativeSelect
                    defaultValue={20}
                    inputProps={{
                      name: "rol",
                      id: "rol",
                    }}
                  >
                    <option value={10}>Administrador</option>
                    <option value={20}>Gestor</option>
                  </NativeSelect>
                </FormControl>
              </Box>
              <div className="btn_container">
                <Button type="submit" disabled={isSubmitting} id="submit">
                  Actualizar
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
