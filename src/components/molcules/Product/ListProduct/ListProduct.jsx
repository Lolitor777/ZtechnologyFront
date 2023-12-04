import React, { useEffect } from "react";
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

const ListProduct = ({load, setIdUpdate, setIdDelete}) => {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}api/product/consultar-productos`)
            console.log(response);
            setRows(response.data.product)
        }

    fetchData();
    },[load])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
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
                <TableCell align="center"><b>Tipo</b></TableCell>
                <TableCell align="center"><b>Descripción</b></TableCell>
                <TableCell align="center"><b>Código</b></TableCell>
                <TableCell align="center"><b>Precio</b></TableCell>
                <TableCell align="center"><b>Cantidad</b></TableCell>
                <TableCell align="center"><b>Acciones</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} >
                    <TableCell align="center">{row.type}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.code}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">{row.amount}</TableCell>
                    <TableCell>
                      <IconButton color="primary" aria-label="Editar"  onClick={() => {handleUpdate(row.id)}} >
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

export default ListProduct;
