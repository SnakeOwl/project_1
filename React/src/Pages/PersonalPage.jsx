import { useContext } from "react";
import { Link } from "react-router-dom";
import FloatInput from "../Components/Inputs/FloatingInputs";
import ContextGlobal from "../context/Global/ContextGlobal";

export default function PersonalPage(){
    const {stateGlobal} = useContext(ContextGlobal);
    const {user} = stateGlobal;
    return (
        <div className="col-3 mx-auto">
            <FloatInput
                className="mb-3"
                labelText="id"
                value={user.id}
                disabled
            />
            <FloatInput
                className="mb-3"
                labelText="email"
                value={user.email}
                disabled
            />
            <FloatInput
                className="mb-3"
                labelText="name"
                value={user.name}
                disabled
            />
            <FloatInput
                className="mb-3"
                labelText="phone"
                value={user.phone}
                disabled
            />
            <Link to='/'>Catalog</Link>
        </div>
    );
}