import { useState } from "react";
import { useSelector } from "react-redux";
import CreateUser from "@components/molcules/User/CreateUser/CreateUser";
import ListUser from "@components/molcules/User/ListUser/ListUser";
import '@styles/indexStyle.css'
import { UpdateUser } from "@components/molcules/User/UpdateUser/UpdateUser";
import { DeleteUser } from "@components/molcules/User/DeleteUser/DeleteUser";
import { useNavigate } from "react-router-dom";

const User = () => {

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
                <ListUser className="list_container" load={load} setIdUpdate={setIdUpdate} setIdDelete={setIdDelete} />
                {user.id_rol == 1 && <CreateUser  load={load} setLoad={setLoad} />}    
                <UpdateUser  idUpdate={idUpdate} load={load} setLoad={setLoad} />
                <DeleteUser idDelete={idDelete} load={load} setLoad={setLoad}/>
            </div>
        </>
    )
}

export default User;