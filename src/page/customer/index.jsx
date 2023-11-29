import CreateCustomer from "../../components/molcules/Customer/CreateCustomer/CreateCustomer";
import { useState } from "react";
import '@styles/indexStyle.css'

const Customer = () => {
    const [load, setLoad] = useState(false);	

    return (
        <>
            <div className="container">
                <CreateCustomer load={load} setLoad={setLoad}/>
            </div>
            
        </>
    )
}

export default Customer;