import CreateCustomer from "@components/molcules/Customer/CreateCustomer/CreateCustomer";
import { useState } from "react";
import '@styles/indexStyle.css'
import ListCustomer from "@components/molcules/Customer/ListCustomer/ListCustomer";
import { DeleteCustomer } from "@components/molcules/Customer/DeleteCustomer/DeleteCustomer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UpdateCustomer } from "@components/molcules/Customer/UpdateCustomer/UpdateCustomer";

const Customer = () => {
    const [load, setLoad] = useState(false);
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
                <ListCustomer className="list_container" load={load} setIdUpdate={setIdUpdate} setIdDelete={setIdDelete} />
                <CreateCustomer load={load} setLoad={setLoad}/>
                <UpdateCustomer idUpdate={idUpdate} load={load} setLoad={setLoad}/>
                <DeleteCustomer idDelete={idDelete} load-={load} setLoad={setLoad} />
            </div>
            
        </>
    )
}

export default Customer;