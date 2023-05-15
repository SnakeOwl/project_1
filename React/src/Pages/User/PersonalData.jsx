import { useContext, useRef, useState } from "react";
import {BlueButton} from "/src/Components/Buttons";
import FloatInput from "../../Components/Inputs/FloatingInputs";
import ContextGlobal from "../../context/Global/ContextGlobal";
import axiosClient from "/src/axios-client";

export default function PersonalData(){
    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);
    const {user, lang} = stateGlobal;

    const [name, setName] = useState(user.name || "");
    const [phone, setPhone] = useState(user.phone || "");
    const [password, setPassword] = useState("");

    function updateUser(event){
        event.preventDefault();

        axiosClient.post(`user/update`, {
            name: name,
            phone: phone,
            password: password,
        })
        .then(({data})=>{
            dispatchGlobal({
                type: 'SET_USER',
                user: data.user
            });
            dispatchGlobal({
                type: 'SET_MESSAGE',
                message: data.message
            });
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

    return (
        <div className="col-12">
            <h1 className="text-center"> 
                {`${lang['user']} # ${user.id}`}
            </h1>
            <form onSubmit={updateUser} className="col-12 col-lg-4 mx-auto">

                <FloatInput
                    className="mb-3"
                    labelText="email"
                    value={user.email}
                    disabled
                />
                <FloatInput
                    id="name"
                    className="mb-3"
                    labelText="name"
                    onHandleChange={(e)=>setName(e.target.value)}
                    value={name}
                />

                <FloatInput
                    id="phone"
                    className="mb-3"
                    labelText={lang['phone']}
                    onHandleChange={(e)=>setPhone(e.target.value)}
                    value={phone}
                />

                <FloatInput
                    id="password"
                    className="mb-3"
                    type="password"
                    labelText={lang['password']}
                    minLength="8"
                    onHandleChange={(e)=>setPassword(e.target.value)}
                    value={password}
                />
                <BlueButton className="w-100 reversed">{lang["submit"]}</BlueButton>
            </form>

        </div>
    );
}