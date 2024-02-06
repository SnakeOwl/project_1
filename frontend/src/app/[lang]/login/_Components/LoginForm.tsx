"use client"

import { PurpleButtonReversed } from "@/_Components/Buttons/ColoredButtons";
import { Input } from "@/_Components/Inputs/Input";
import ContextUser from "@/context/User/ContextUser";
import { useContext, useState } from "react";
import FormWrapper from "@/_Components/FormWrapper";

export default function LoginForm({ dict }: { dict: any }) {

    // form's data
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState<any>();
    const { dispatchUser } = useContext(ContextUser);

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


    // debug function
    function fillAsPartner() {
        setData({
            email: "SuperPartner@email.com",
            password: "SuperPartner",
        });
    }

    function fillAsAdmin() {
        setData({
            email: "administrator@email.com",
            password: "administrator",
        });
    }

    return (
        <FormWrapper
            data={data}
            submitText={dict["login"]}
            createMode={true}
            createURL="login"
            setGeneralErrors={setErrors}
            successCallback={updateUserInfo}
        >
            <Input
                type="email"
                value={data.email}
                onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                label={dict["email"]}
                placeholder="WalterWhite@gmail.com"
                className="mb-8"

                error={errors?.email || null}
                required
            />

            <Input
                type="password"
                onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                label={dict["password"]}
                className="mb-8"
                value={data.password}

                error={errors?.password || null}
                required
            />

            <PurpleButtonReversed
                type="button"
                onClick={fillAsPartner}
                className="w-full py-2 mb-2 rounded-lg"
            >
                fill as partner
            </PurpleButtonReversed>

            <PurpleButtonReversed
                type="button"
                onClick={fillAsAdmin}
                className="w-full py-2 mb-2 rounded-lg"
            >
                fill as Admin
            </PurpleButtonReversed>
        </FormWrapper>

    );
}
