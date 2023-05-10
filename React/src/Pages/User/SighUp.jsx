import { useContext, useRef, useState } from "react";
import { FloatInput } from "../../Components/Inputs/FloatingInputs";
import { BlueButton } from "../../Components/Buttons";
import ContextGlobal from "../../context/Global/ContextGlobal";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../../axios-client";

export default function SighUp(){
    
    if (localStorage.getItem('ACCESS_TOKEN') !== null)
        return <Navigate to="/" replace={true}/>

    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const passConfirmationRef = useRef();

    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;

    function handleSubmit(event){
        event.preventDefault();
        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passRef.current.value,
            password_confirmation: passConfirmationRef.current.value,
        }

        axiosClient.post('signup', data)
            .then(({data}) =>{
                dispatchGlobal({
                    type: 'LOGIN',
                    user: data.user,
                    csrf_token: data.token
                })
            })
            .catch(error => {
                const {response} = error;

                if (response && response.status === 422){
                    dispatchGlobal({
                        type: 'SET_MESSAGE',
                        message: response.data.message
                        
                    });
                    dispatchGlobal({
                        type: 'SET_ERRORS',
                        errors: response.data.errors
                        
                    });
                }
            });
    }

    return (
        <div className="col-12 col-xxl-3 my-5 mx-auto">
            <h1 className="text-center">{lang["registration"]}</h1>
            
            <form onSubmit={handleSubmit}>
                <FloatInput
                    id="name"
                    useRef={nameRef}
                    labelText={lang["name"]}
                    className="mb-3"
                    autoComplete="name"
                    isFocused={true}
                    required
                />

                <FloatInput
                    id="email"
                    useRef={emailRef}
                    labelText="Email"
                    type="email"
                    className="mb-3"
                    required
                />

                <FloatInput
                    useRef={passRef}
                    labelText={lang["password"]}
                    type="password"
                    autoComplete="off"
                    className="mb-2"
                    required
                />

                <FloatInput
                    useRef={passConfirmationRef}
                    labelText={lang["confirm password"]}
                    type="password"
                    className="mb-3"
                    autoComplete="off"
                    required
                />

                <BlueButton className="mb-3 w-100">
                    {lang['submit']}
                </BlueButton>

                <div className="text-center">
                    <Link to={'/login'} className="mb-3">
                        {lang['has account']}?
                    </Link>
                </div>
            </form>
        </div>
    );
}