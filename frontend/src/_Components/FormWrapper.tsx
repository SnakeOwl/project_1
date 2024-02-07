import axiosClient from "@/axios-client";
import { FormEvent, useState } from "react";
import { GreenText, RedText } from "./text/borderedText";
import { BlueButton } from "./Buttons/ColoredButtons";
import Script from "next/script";

interface IProps {
    children: React.ReactNode
    data: any

    // если передаешь свою кнопку, то нужно скопировать подход создания её.
    // для работы рекапчи
    submitText?: string | React.ReactNode
    successText?: string

    // переключение между create | update элемента
    createMode: boolean
    createURL: string
    updateURL?: string

    // связывает этот компонент с делегирующим, чтобы в Input отправить ошибку
    setGeneralErrors: Function

    // callback after success result.
    // (data)=>{}
    successCallback?: Function

    headers?: object
    // При передаче файлов, метод PUT не подходит.
    usePostUpdate?: boolean
}

export default function FormWrapper({
    children,
    data,
    submitText = "Submit",
    successText = "Success",

    createMode = true,
    createURL,
    updateURL = "",

    setGeneralErrors,

    successCallback,

    headers = {},
    usePostUpdate = false,

    ...other
}: IProps) {

    // данные для визуализации формы
    const [side, setSide] = useState({
        errMessage: undefined,
        success: false
    });


    async function hundleSubmit(e: FormEvent) {
        e.preventDefault();

        let request: Promise<any>;

        if (createMode) {
            request = axiosClient.post(createURL, data, { headers });
        } else {
            if (usePostUpdate) {
                request = axiosClient.post(updateURL, data, { headers });
            } else {
                request = axiosClient.put(updateURL, data, { headers });
            }
        }

        // grecaptcha подтягивается с помощью внешнего скрипта.
        grecaptcha.ready(function () {
            grecaptcha.execute( process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "", { action: 'submit' }).then(function (token: string) {
                Promise.resolve(request)
                    .then(({ data }) => {
                        setSide({ errMessage: undefined, success: true });

                        if (successCallback !== undefined)
                            successCallback(data);
                    })
                    .catch(error => {
                        // если нет респонса, значит нет ответа от сервера
                        if (error.response === undefined)
                            throw new Error("Проблема соединения с сервером")


                        const { response } = error
                        // ошибка валидации
                        if (response.data.errors != undefined) {
                            setGeneralErrors({ ...response.data.errors });
                        }

                        // общие ошибки
                        setSide(s => {
                            return {
                                ...s,
                                errMessage: response.data.message
                            }
                        });
                    })
            });
        });

    }


    return (
        <form onSubmit={hundleSubmit} {...other} >
            <Script src={"https://www.google.com/recaptcha/api.js?render=6LeBglgnAAAAACbe837nBWG7Cjzb7TCNw_DML8aV"} />


            {side.errMessage !== undefined &&
                <RedText className="mb-4">
                    {side.errMessage}
                </RedText>
            }


            {children}


            {side.success === false ?
                <BlueButton
                    className="w-full py-2"
                >
                    {submitText}
                </BlueButton>
                :
                <GreenText className="text-center">
                    {successText}
                </GreenText>
            }
        </form>
    )
}
