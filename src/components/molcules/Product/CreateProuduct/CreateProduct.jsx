import { TextField, Button } from "@mui/material";
import * as React from "react";
import { Formik } from "formik";
import "@styles/CreateStyle.css";
import axios from "axios";
import * as Yup from "yup";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const CreateProduct = (load, setLoad) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setRol(event.target.value);
  };

  return (
    <div>
      <Formik
        initialValues={{
          type: "",
          description: "",
          code: "",
          price: "",
          amount: "",
        }}
        validationSchema={Yup.object({
          type: Yup.string().required("Este campo es obligatorio"),
          description: Yup.string().required("Este campo es obligatorio"),
          code: Yup.number().required("Este campo es obligatorio"),
          price: Yup.number().required("Este campo es obligatorio"),
          amount: Yup.number().required("Este campo es obligatorio"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}api/product//guardar-productos`, values);
          console.log(response);
          setLoad(!load);
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="container_form">
              <div className="title">
                <h3 className="title_form">Crea un producto</h3>
                <AddShoppingCartIcon
                  aria-label="icono de producto"
                  sx={{ fontSize: 50 }}
                ></AddShoppingCartIcon>
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
                id="code"
                name="code"
                label="Código"
                onChange={handleChange}
                value={values.code}
                error={errors.code}
                helperText={errors.code}
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

export default CreateProduct;
