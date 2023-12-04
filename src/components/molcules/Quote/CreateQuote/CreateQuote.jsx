import { TextField, Button } from "@mui/material";
import * as React from "react";
import { Formik } from "formik";
import "@styles/CreateStyle.css";
import axios from "axios";
import * as Yup from "yup";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


const CreateQuote = (load, setLoad) => {
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
          shipping_price: "",
          amount_discount: "",
          porcentage_discount: "",
          total: "",
          id_product: "",
          id_user: "",
          id_customer: ""
        }}
        validationSchema={Yup.object ({
          shipping_price: Yup.number()
                .required('Este campo es obligatorio'),
          amount_discount: Yup.number(),
          
          porcentage_discount: Yup.number(),
          
          total: Yup.number()
                .required('Este campo es obligatorio'),
          id_product: Yup.number()
                .required('Este campo es obligatorio'),
          id_user: Yup.number()
                .required('Este campo es obligatorio'),
          id_customer: Yup.number()
                .required('Este campo es obligatorio'),    
        })}

        onSubmit={async(values, { setSubmitting }) => {
          const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}api/quote/guardar-cotizacion`, values);
          setLoad(!load)
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
            <div className="container_form">
              <div className="title">
                <h3 className="title_form">Crea una contización</h3>
                <AttachMoneyIcon 
                aria-label="icono de signo pesos"
                sx={{ fontSize: 50 }} 
                color="success">
                </AttachMoneyIcon>
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
                label="Porcentaje de descuento"
                onChange={handleChange}
                value={values.porcentage_discount}
                error={errors.porcentage_discount}
                helperText={errors.porcentage_discount}
              />
              <TextField
                className="input"
                id="total"
                name="total"
                label="Total"
                onChange={handleChange}
                value={values.total}
                error={errors.total}
                helperText={errors.total}
              />
              <TextField
                className="input"
                id="id_product"
                name="id_product"
                label="Producto"
                onChange={handleChange}
                value={values.id_product}
                error={errors.id_product}
                helperText={errors.id_product}
              />
              <TextField
                className="input"
                id="id_user"
                name="id_user"
                label="Usuario"
                onChange={handleChange}
                value={values.id_user}
                error={errors.id_user}
                helperText={errors.id_user}
              />
              <TextField
                className="input"
                id="id_customer"
                name="id_customer"
                label="Cliente"
                onChange={handleChange}
                value={values.id_customer}
                error={errors.id_customer}
                helperText={errors.id_customer}
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

export default CreateQuote;
