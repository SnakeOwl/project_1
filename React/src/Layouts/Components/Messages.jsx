import { useContext } from "react";
import ContextGlobal from "../../context/Global/ContextGlobal";

export default function Messages(){
    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);
    const {message} = stateGlobal;

    function closeMessage(){
        dispatchGlobal({type: 'CLELAR_MESSAGE'});
    }

    return (
        <>
        {message !== null &&
            <div 
                className="col-12 col-lg-3 cursor-pointer fixed-bottom m-lg-4"
                onClick={closeMessage}
                >
                <div className="text-center bg-primary text-light rounded p-5">
                    {message}
                </div>
            </div>
        }
        </>
    );
}

