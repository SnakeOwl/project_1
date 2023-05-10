import { useContext } from "react";
import { Link } from "react-router-dom";
import FloatInput from "../../Components/Inputs/FloatingInputs";
import ContextGlobal from "../../context/Global/ContextGlobal";

export default function PersonalPage(){
    const {stateGlobal} = useContext(ContextGlobal);
    const {user} = stateGlobal;
    return (
        <div className="col-3 mx-auto">
            
        </div>
    );
}