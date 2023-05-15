import { useContext, useRef } from "react"
import { BlueButton } from "/src/Components/Buttons";
import ContextGlobal from "/src/context/Global/ContextGlobal"
import FloatInput from "/src/Components/Inputs/FloatingInputs"
import axiosClient from "/src/axios-client";

export default function SubscribeForm({className, offerId}){
    const {stateGlobal,dispatchGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;
    
    const emailRef = useRef();

    function subscribe(e){
        e.preventDefault();

        axiosClient.post('/subscribe', {
            email: emailRef.current.value,
            offer_id: offerId
        }).then(({data})=>{
            dispatchGlobal({
                type: 'SET_MESSAGE',
                message: lang[data.message]
            });
            setSubscribeMode(false);
        }).catch(error=>{
            dispatchGlobal({
                type: 'SET_MESSAGE',
                message: error.response.data.message
            });
        });
    }
        

    return (
        <div className={className}>
            <p className="text-center">{lang['subscribe text']}</p>

            <form onSubmit={subscribe}>
                <FloatInput
                    className="mb-2"
                    type="email"
                    id="email"
                    required="required"
                    labelText="email"
                    useRef={emailRef}
                />
                <BlueButton className="inverted rounded w-100">
                    {lang['submit']}
                </BlueButton>
            </form>
        </div>
    )
}