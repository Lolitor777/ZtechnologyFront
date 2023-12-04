import { TextField, Dialog, Button } from "@mui/material";
import * as React from "react";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import UpdateIcon from "@mui/icons-material/Update";

export const UpdateQuote = ({idUpdate, load, setLoad}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const consultQuoteById = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/quote/consultar-cotizacion-por-id/${id}`);
    setFormData(response.data.quote);
  };

  React.useEffect(() => {
    if (idUpdate) {
      consultQuoteById(idUpdate);
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
          shipping_price: formData.shipping_price || "",
          amount_discount: formData.amount_discount || "",
          porcentage_discount: formData.porcentage_discount || "",
          id_product: formData.id_product || "",
          id_user: formData.id_user || "",
          id_customer: formData.id_customer || ""
        }}
        validationSchema={Yup.object({
          shipping_price: Yup.string().required("Este campo es obligatorio"),
          amount_discount: Yup.string(),
          porcentage_discount: Yup.string(),
          id_product: Yup.number().required("Este campo es obligatorio"),
          id_user: Yup.number().required("Este campo es obligatorio"),
          id_customer: Yup.number().required("Este campo es obligatorio")
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const response = await axios.put(
            `${
              import.meta.env.VITE_URL_SERVER
            }api/quote/modificar-cotizacion`,
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
                <h3 className="title_form">Actualizar cotizacion</h3>
                <UpdateIcon
                  aria-label="Actualizar"
                  sx={{ fontSize: 50 }}
                ></UpdateIcon>
              </div>

              <TextField
                className="input"
                id="shipping_price"
                name="shipping_price"
                label="Precio de envío"
                onChange={handleChange}
                value={values.shipping_price}
                error={errors.shipping_price}
                helperText={errors.shipping_price}
              />
              <TextField
                className="input"
                id="amount_discount"
                name="amount_discount"
                label="Cantidad de descuento"
                onChange={handleChange}
                value={values.amount_discount}
                error={errors.amount_discount}
                helperText={errors.amount_discount}
              />
              <TextField
                className="input"
                id="porcentage_discount"
                name="porcentage_discount"
                label="Porcentaje a descontar"
                onChange={handleChange}
                value={values.porcentage_discount}
                error={errors.porcentage_discount}
                helperText={errors.porcentage_discount}
              />
              <TextField
                className="input"
                id="id_product"
                name="id_product"
                label="Id del producto"
                onChange={handleChange}
                value={values.id_product}
                error={errors.id_product}
                helperText={errors.id_product}
              />
              <TextField
                className="input"
                id="id_user"
                name="id_user"
                label="Id del usuario"
                onChange={handleChange}
                value={values.id_user}
                error={errors.id_user}
                helperText={errors.id_user}
              />

              <TextField
                className="input"
                id="id_customer"
                name="id_customer"
                label="Id del cliente"
                onChange={handleChange}
                value={values.id_customer}
                error={errors.id_customer}
                helperText={errors.id_customer}
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
