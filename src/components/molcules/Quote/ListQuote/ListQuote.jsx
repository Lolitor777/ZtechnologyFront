import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

const ListQuote = ({load, setIdUpdate, setIdDelete}) => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${import.meta.env. VITE_URL_SERVER}api/quote/consultar-cotizaciones`)
            console.log(response);
            setRows(response.data.quote)
        }

    fetchData();
    },[load])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleUpdate = async (id) => {
    setIdUpdate(id);
  }

  const handleDelete = async (id) => {
    setIdDelete(id);
  }

  return (
    <div className="list_container">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Numeración</b></TableCell>
                <TableCell align="center"><b>Precio de envío</b></TableCell>
                <TableCell align="center"><b>Cant. descuento</b></TableCell>
                <TableCell align="center"><b>% de descuento</b></TableCell>
                <TableCell align="center"><b>Sub total</b></TableCell>
                <TableCell align="center"><b>Total</b></TableCell>
                <TableCell align="center"><b>Producto</b></TableCell>
                <TableCell align="center"><b>Usuario</b></TableCell>
                <TableCell align="center"><b>Cliente</b></TableCell>
                <TableCell align="center"><b>Acciones</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} >
                    <TableCell align="center">{row.numeration}</TableCell>
                    <TableCell align="center">{row.shipping_price}</TableCell>
                    <TableCell align="center">{row.amount_discount}</TableCell>
                    <TableCell align="center">{row.porcentage_discount}</TableCell>
                    <TableCell align="center">{row.sub_total}</TableCell>
                    <TableCell align="center">{row.total}</TableCell>
                    <TableCell align="center">{row.product.description}</TableCell>
                    <TableCell align="center">{row.user.names}</TableCell>
                    <TableCell align="center">{row.customer.name}</TableCell>
                    <TableCell>
                      <IconButton color="primary" aria-label="Editar" onClick={() => {handleUpdate(row.id)}} >
                        <BorderColorIcon />
                      </IconButton>
                      <IconButton color="primary" aria-label="Eliminar" onClick={() => {handleDelete(row.id)}}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  );
                  
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default ListQuote;
