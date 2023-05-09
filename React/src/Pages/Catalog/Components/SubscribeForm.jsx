import { useContext, useRef } from "react"
import { RedButton } from "/src/Components/Buttons";
import ContextGlobal from "/src/context/Global/ContextGlobal"
import FloatInput from "/src/Components/Inputs/FloatingInputs"

export default function SubscribeForm({className, offerId}){
    const {stateGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;
    
    const emailRef = useRef();

    function subscribe(){
        const data = {
            email: emailRef.current.value,
            offerId: offerId,
        } 

        
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
                <RedButton className="inverted rounded w-100">
                    {lang['submit']}
                </RedButton>
            </form>
        </div>
    )
}