"use client"

import { useContext, useState } from "react"
import { Input } from "@/_Components/Inputs/Input";
import ContextUser from "@/context/User/ContextUser";
import FormWrapper from "@/_Components/FormWrapper";

export default function SighupForm({ dictionary }: { dictionary: any }) {

    const { dispatchUser } = useContext(ContextUser);

    // данные для отправки на сервер
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    // данные для визуализации формы
    const [errors, setErrors] = useState<any>();


    function updateUserInfo(response: any) {
        // обновление записи пользователя в приложении
        dispatchUser({
            type: 'SET_TOKEN',
            token: response.token,
        });

        // запись токена для проверки в API, на сервере
        if (response.token) {
            localStorage.setItem('ACCESS_TOKEN', response.token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }


    // изменение бордера input#password_confirmation, в зависимости от соответствия к его значению
    function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
        const input = document.getElementById("password_confirmation");

        if (input !== null) {
            if (e.target.value === data.password_confirmation) {
                input.classList.remove("border-red-800")
            } else {
                input.classList.add("border-red-800")
            }
        }

        setData({ ...data, password: e.target.value });
    }


    // изменение бордера input#password_confirmation, в зависимости от соответствия паролю
    function handleChangePasswordConfirmation(e: React.ChangeEvent<HTMLInputElement>) {
        const input = document.getElementById("password_confirmation");

        if (input !== null) {
            if (e.target.value === data.password) {
                input.classList.remove("border-red-800")
            } else {
                input.classList.add("border-red-800")
            }
        }

        setData({ ...data, password_confirmation: e.target.value });
    }

    
    return (
        <FormWrapper
            data={data}
            submitText={dictionary["goRegister"]}
            createURL="signup"
            createMode={true}
            setGeneralErrors={setErrors}
            successCallback={updateUserInfo}
        >
            <Input
                label={dictionary["name"]}
                value={data.name}
                className={"mb-8"}

                onChange={(e) => { setData({ ...data, name: e.target.value }) }}
                error={errors?.name}
                required
                placeholder="Walter White"
            />

            <Input
                type="email"
                label={dictionary["email"]}
                value={data.email}

                className={"mb-8"}
                onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                error={errors?.email}
                required

                placeholder="WalterWhite@gmail.com"
            />

            <Input
                id="password"
                type="password"
                label={dictionary["password"]}
                value={data.password}

                className={"mb-8"}
                onChange={handleChangePassword}
                error={errors?.password}
                required

                minLength={8}
            />

            <Input
                id="password_confirmation"
                type="password"
                label={dictionary["confirm password"]}
                value={data.password_confirmation}

                className={"mb-8"}
                onChange={handleChangePasswordConfirmation}
                error={errors?.password_confirmation}

                required
            />
        </FormWrapper>
    )
}