import { TextField, Button, } from "@mui/material";
import * as React from "react";
import { Formik } from "formik";
import "@styles/CreateStyle.css";
import axios from "axios";
import * as Yup from "yup";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';


const CreateCustomer = (load, setLoad) => {
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
          name: "",
          document_number: "",
          email: ""
        }}
        validationSchema={Yup.object ({
          name: Yup.string()
                .required('Este campo es obligatorio'),
          document_number: Yup.number()
                .required('Este campo es obligatorio'),
          email: Yup.string()
                .required('Este campo es obligatorio')
                .email('Dirección de correo no valida'),
        })}

        onSubmit={async(values, { setSubmitting }) => {
          const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}api/customer/guardar-clientes`, values);
          console.log(response);
          setLoad(!load)
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
            <div className="container_form">
            <div className="title">
              <h3 className="title_form">Crea un cliente</h3>
              <AssignmentIndIcon 
              aria-label="icono de cliente"
              sx={{ fontSize: 50 }}>
              </AssignmentIndIcon>
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
                className="email input"
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

export default CreateCustomer;
