import { useState } from "react";
import { useSelector } from "react-redux";
import '@styles/indexStyle.css'
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "@components/molcules/Profile/ChangePassword/ChangePassword";
import { InfoProfile } from "../../components/molcules/Profile/Profile/InfoProfile";


const Profile = () => {

    const [load, setLoad] = useState(false);
    const [idUpdate, setIdUpdate] = useState('');
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
            <div>
                <InfoProfile />
                <ChangePassword load={load} setLoad={setLoad}/>
            </div>
        </>
    )
}

export default Profile;