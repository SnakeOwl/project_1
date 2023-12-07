import axiosClient from "@/axios-client";
import { FormEvent, useState } from "react";
import { GreenText, RedText } from "./text/borderedText";
import { BlueButton } from "./Buttons/ColoredButtons";

interface IProps {
    children: React.ReactNode
    data: any
    submitText?: string
    successText?: string
    
    // переключение между create | update элемента
    createMode: boolean
    createURL: string
    updateURL: string

    // связывает этот компонент с делегирующим, чтобы в Input отправить ошибку
    setGeneralErrors: Function 
}

export default function FormWrapper({
    children,
    data,
    submitText="Отправить",
    successText="Успешно",
    createMode=true,
    createURL,
    updateURL,

    setGeneralErrors
}: IProps) {

    // данные для визуализации формы
    const [side, setSide] = useState({
        errMessage: undefined,
        success: false
    });


    async function hundleSubmit(e: FormEvent){
        e.preventDefault();

        let request = undefined;

        if (createMode){
            request = axiosClient.post(createURL, data)
        } else {
            request = axiosClient.put(updateURL, data)
        }

        Promise.resolve(request)
            .then(({ status }) => {
                if (status === 204) {
                    setSide({ ...side, success: true });
                }
            })
            .catch(error => {
                // если нет респонса, значит нет ответа от сервера
                if (error.response === undefined)
                    throw new Error("Проблема соединения с сервером")


                const { response } = error
                // ошибка валидации
                if (response.data.errors != undefined) {
                    setGeneralErrors({...response.data.errors}) ;
                }

                // общие ошибки
                setSide(s => {
                    return {
                        ...s,
                        errMessage: response.data.message
                    }
                });
            })
    }


    return (
        <form onSubmit={hundleSubmit}>
                {side.errMessage !== undefined &&
                    <RedText className="mb-4">
                        {side.errMessage}
                    </RedText>
                }


                {children}


                {side.success === false ?
                    <BlueButton className="w-full py-2">
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
