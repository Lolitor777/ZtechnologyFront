import '@styles/indexStyle.css'
import { useState } from 'react';
import CreateProduct from '@components/molcules/Product/CreateProuduct/CreateProduct';
import ListProduct from '@components/molcules/Product/ListProduct/ListProduct';
import { UpdateProduct } from '@components/molcules/Product/UpdateProduct/UpdateProduct';
import { DeleteProduct } from '@components/molcules/Product/DeleteProduct/DeleteProduct';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Product = () => {
    const[load, setLoad] = useState(false);
    const [idUpdate, setIdUpdate] = useState('');
    const [idDelete, setIdDelete] = useState('');
    const user = useSelector(state => state.auth.user)
    const loading = useSelector(state => state.auth.loading)
    const navigate = useNavigate();

    if (loading) {
        return <>Cargando...</>
    }

    if (!user) {
        return navigate("/")
    }

    return (
        <>
            <div className="container">
                <ListProduct className="list_container" load={load} setIdUpdate={setIdUpdate} setIdDelete={setIdDelete}/>
                <CreateProduct load={load} setLoad={setLoad} />
                <UpdateProduct idUpdate={idUpdate} load={load} setLoad={setLoad}/>
                <DeleteProduct idDelete={idDelete} load-={load} setLoad={setLoad}/>
            </div>
        </>
    )
}

export default Product;