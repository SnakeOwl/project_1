import { FloatInput } from "../../Components/Inputs/FloatingInputs";
import { BlueButton, GreenButton } from "../../Components/Buttons";
import { useContext, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ContextGlobal from "../../context/Global/ContextGlobal";
import axiosClient from "../../axios-client";

export default function Login(){
    
    if (localStorage.getItem('ACCESS_TOKEN') !== null)
        return <Navigate to="/" replace={true}/>

    const emailRef = useRef();
    const passRef = useRef();

    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;
    

    function handleSubmit(event){
        event.preventDefault();
        const data = {
            email: emailRef.current.value,
            password: passRef.current.value,
        }

        axiosClient.post('login', data)
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
                        type: 'SET_ERRORS',
                        errors: response.data.errors
                    });
                    dispatchGlobal({
                        type: 'SET_MESSAGE',
                        message: response.data.message
                    });
                }
            });
    }

    function loginAdmin(){
        passRef.current.value="administrator";
        emailRef.current.value="administrator@gmail.com";
    }

    return (
        <div className="col-12 col-lg-2 my-5 mx-auto">
            <form  onSubmit={handleSubmit}>
                <p className="h3 mb-2 text-center">{lang["sign in"]}</p>

                <FloatInput
                    id="email"
                    type="email"
                    useRef={emailRef}
                    className="mb-3"
                    isFocused={true}
                    labelText="email"
                    required={true}
                />

                <FloatInput
                    id="password"
                    type="password"
                    useRef={passRef}
                    className="mb-3"
                    labelText={lang["password"]}
                    required={true}
                />

                <div className="text-center">
                    <BlueButton className="w-100 mb-2 rounded">
                        {lang['log in']}
                    </BlueButton>

                    <div className="mt-3">
                        {lang['newUser']} <br/>
                        <Link className={"h5"} to={'/signup'}>{lang['goRegister']}</Link>
                    </div>
                </div>
            </form>

            <GreenButton
                className="w-100 mt-3"
                onHandleClick={loginAdmin}>
                Войти как администратор
            </GreenButton>
        </div> 
    );
}