"use client"

import axiosClient from "@/axios-client";
import { BlueButton, PurpleButtonReversed } from "@/Components/Buttons/ColoredButtons";
import { Input } from "@/Components/Inputs/Input";
import ContextUser from "@/context/User/ContextUser";
import { useContext, useState } from "react";
import ReCaptchaGoogleV3 from "@/Components/recaptches/ReCaptchaGoogleV3"


interface IProps {
    dict: any
}


export default function LoginForm({
    dict
}: IProps) {

    const [CaptchaIsVerified, setCaptchaIsVerified] = useState(false);


    // form's data
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    function _setData(e: React.ChangeEvent<HTMLInputElement>) {
        setData({
            ...data,
            [e.target.id]: e.target.value
        })
    }

    // form's side data
    const [side, setSide] = useState({
        errors: {
            email: undefined,
            password: undefined
        },
        errMessage: null,
    });


    const { dispatchUser } = useContext(ContextUser);


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!CaptchaIsVerified)
            return false;


        await axiosClient.post('login', data)
            .then(({ data }) => {
                // обновление записи пользователя в приложении
                dispatchUser({
                    type: 'SET_TOKEN',
                    token: data.token,
                });

                // запись токена для проверки в API, на сервере
                if (data.token) {
                    localStorage.setItem('ACCESS_TOKEN', data.token);
                } else {
                    localStorage.removeItem('ACCESS_TOKEN');
                }
            })
            .catch(error => {
                // если нет респонса, значит нет ответа от сервера
                if (error.response === undefined) {
                    setSide(s => {
                        return {
                            ...s,
                            errMessage: dict["server conn propblem"]
                        }
                    });

                    return;
                }

                const { response } = error;
                if (response.data.errors !== undefined) {
                    setSide(s => {
                        return {
                            ...s,
                            errors: response.data.errors
                        }
                    });
                }

                // общие ошибки
                setSide(s => {
                    return {
                        ...s,
                        errMessage: response.data.message
                    }
                });
                console.log(response);
            });
    }


    // debug function
    function fillAsPartner(){
        setData({
            email:"SuperPartner@email.com",
            password:"SuperPartner",
        });
    }


    return (
        <form onSubmit={handleSubmit} name="login" className="text-left px-4">

            <div className="hidden">
                <ReCaptchaGoogleV3
                    onVerify={() => setCaptchaIsVerified(true)}
                    lang={dict["cl"]}
                />
            </div>


            {side.errMessage !== null &&
                <p className="text-red-600 border-red-200 border-2 text-justify py-3 px-2 rounded-md">{side.errMessage}</p>
            }
            <Input
                id="email"
                type="email"
                value={data.email}
                onChange={_setData}
                label={dict["email"]}
                placeholder="WalterWhite@gmail.com"
                className="mb-8"

                error={side.errors.email}
                required
            />

            <Input
                id="password"
                type="password"
                onChange={_setData}
                label={dict["password"]}
                className="mb-8"
                value={data.password}

                error={side.errors.password}
                required
            />


            {CaptchaIsVerified &&
                <BlueButton className={"w-full py-3"}>
                    {dict["log in"]}
                </BlueButton>
            }

            <PurpleButtonReversed 
                onClick={fillAsPartner} 
                className="w-full py-2 mt-4 rounded-lg"
                >
                fill as partner
            </PurpleButtonReversed>
        </form>
    );
}