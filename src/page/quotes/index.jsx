import { useState } from "react";
import { useSelector } from "react-redux";
import CreateQuote from "@components/molcules/Quote/CreateQuote/CreateQuote";
import ListQuote from "@components/molcules/Quote/ListQuote/ListQuote";
import '@styles/indexStyle.css'
import { UpdateQuote } from "@components/molcules/Quote/UpdateQuote/UpdateQuote";
import { DeleteQuote } from "@components/molcules/Quote/DeleteQuote/DeleteQuote";
import { useNavigate } from "react-router-dom";

const Quote = () => {

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
                <ListQuote className="list_container" load={load} setIdUpdate={setIdUpdate} setIdDelete={setIdDelete}/>
                <CreateQuote load={load} setLoad={setLoad}/>
                <UpdateQuote idUpdate={idUpdate} load={load} setLoad={setLoad}/>
                <DeleteQuote idDelete={idDelete} load={load} setLoad={setLoad}/>
            </div>
        </>
    )
}

export default Quote;