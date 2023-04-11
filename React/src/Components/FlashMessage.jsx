
import {useContext} from 'react'
import ContextGlobal from '../context/Global/ContextGlobal';

export default function FlashMessage(){
    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal)
    const {message} = stateGlobal;

    function clearMessage(){
        dispatchGlobal({
            type: "CLELAR_MESSAGE"
        });
    }

    return (
        <>
        {(message !== null) &&
            <div
                className="fixed-bottom m-4"
                onClick={clearMessage}
            >
                <div className="col-6 col-lg-3 text-center box-blue rounded p-5 cursor-pointer">
                    {message}
                </div>
            </div>
        }
        </>
    );
}
