"use client"

import { useState } from "react";
import { BlueButton } from '@/_Components/Buttons/ColoredButtons'
import { Input } from "@/_Components/Inputs/Input"
import axiosClient from '@/axios-client'
import ReCaptchaGoogleV3 from "@/_Components/recaptches/ReCaptchaGoogleV3";
import { Textarea } from "@/_Components/Inputs/Textarea";
import FormWrapper from "@/_Components/FormWrapper";


interface IPostData {
    name: string
    email: string
    message: string
}


export default function SupportForm({ dict }: {dict: any}) {

    const [CaptchaIsVerified, setCaptchaIsVerified] = useState(false);


    // данные для отправки на сервер
    const [data, setData] = useState<IPostData>({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState<any>();


    return (
        <FormWrapper
            data={data}
            createURL="message-store"
            createMode={true}
            setGeneralErrors={setErrors}
            submitText={dict["submit"]}
        >

            <div className="hidden">
                <ReCaptchaGoogleV3
                    onVerify={() => setCaptchaIsVerified(true)}
                    lang={dict["cl"]}
                />
            </div>

            <Input
                className="mb-4"
                label={dict["name"]}
                id="name"
                value={data.name}

                placeholder={"Walter White"}
                onChange={e => setData({ ...data, name: e.target.value })}
                error={errors?.name}
                required
            />

            <Input
                className="mb-4"
                label={dict["email"]}
                id="email"
                type="email"

                value={data.email}
                placeholder={"WalterWhite@yandex.ru"}
                onChange={e => setData({ ...data, email: e.target.value })}
                error={errors?.email}

                required
            />

            <Textarea
                id="message"
                label={dict["message"]}
                placeholder={"Я не доволен дешевизной товара"}
                onChange={e => setData({ ...data, message: e.target.value })}

                value={data.message}
                error={errors?.message}
                required
            />

            <p className="text-center">{dict['contact form message']}</p>

        </FormWrapper>
    );
}