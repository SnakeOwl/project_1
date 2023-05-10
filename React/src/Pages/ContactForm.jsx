import { useContext, useRef } from "react";
import axiosClient from "../axios-client";
import BlueButton from "../Components/Buttons";
import { FloatTextarea, FloatInput } from "../Components/Inputs/FloatingInputs";
import ContextGlobal from "../context/Global/ContextGlobal";

export default function ContactForm(){
    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;

    const emailRef = useRef();
    const nameRef = useRef();
    const messageRef = useRef();

    function handleSubmit(event){
        event.preventDefault();

        axiosClient.post('message-store', {
            name: nameRef.current.value,
            email: emailRef.current.value,
            message: messageRef.current.value,
        })
        .then(({data})=>{
            dispatchGlobal({
                type: "SET_MESSAGE",
                message: lang[data.message]
            });
        })
        .catch(error=>{
            const {response} = error;

            if (response && response.status === 422){
                dispatchGlobal({
                    type: 'SET_ERRORS',
                    errors: response.data.errors
                });
                dispatchGlobal({
                    type: 'SET_MESSAGE',
                    message: response.data.message
                });
            }
        });

        const refs = [nameRef, emailRef, messageRef];
        refs.forEach(element=>{ element.current.value = "" })
    }

    return (
        <div className="col-12 col-lg-3 mx-auto">
            <form onSubmit={handleSubmit}>
            <FloatInput
                id="name"
                labelText={lang['name']}
                className="mb-3"
                useRef={nameRef}
                minLength="2"
                required
             />

            <FloatInput
                id="email"
                labelText="Email"
                className="mb-3"
                useRef={emailRef}
                required
             />

             <FloatTextarea
                id="message"
                labelText={lang['message']}
                className="mb-3"
                useRef={messageRef}
                rows={5}
                required
             />

             <BlueButton className="w-100">
                {lang['submit']}
            </BlueButton>
             </form>
        </div>
    );
}