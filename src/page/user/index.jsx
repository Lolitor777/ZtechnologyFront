import { useState } from "react";
import CreateUser from "@components/molcules/User/CreateUser/CreateUser";
import ListUser from "@components/molcules/User/ListUser/ListUser";
import '@styles/indexStyle.css'
import { UpdateUser } from "@components/molcules/User/UpdateUser/UpdateUser";
import { DeleteUser } from "@components/molcules/User/DeleteUser/DeleteUser";

const User = () => {

    const[load, setLoad] = useState(false);
    const [idUpdate, setIdUpdate] = useState('');
    const [idDelete, setIdDelete] = useState('');	

    return (
        <> 
            <div className="container">
                <ListUser className="list_container" load={load} setIdUpdate={setIdUpdate} setIdDelete={setIdDelete} />
                <CreateUser  load={load} setLoad={setLoad} />    
                <UpdateUser  idUpdate={idUpdate} load={load} setLoad={setLoad} />
                <DeleteUser idDelete={idDelete} load-={load} setLoad={setLoad}/>
            </div>
        </>
    )
}

export default User;