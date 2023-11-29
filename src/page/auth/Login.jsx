import { Container, TextField, Button } from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { fetchLogin } from "@lib/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  // if (loading) {
  //   return <>Cargando...</>
  // }

  if (user) {
    return navigate("/usuarios")
  }

  return (
    <div>
      <Container>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .required("Este campo es obligatorio")
              .email("Dirección de correo no valida"),
            password: Yup.string()
              .required("Este campo es obligatorio")
              .min(8, "Digite por lo menos 8 caracteres"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const response = await dispatch(fetchLogin(values));
            if(response.payload.user) {
              return navigate("/usuarios")
            }
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
                <h2 className="title_form">Inicio de sesión</h2>
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
                <Button type="submit">Iniciar sesión</Button>
              </div>
            </form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default Login;
