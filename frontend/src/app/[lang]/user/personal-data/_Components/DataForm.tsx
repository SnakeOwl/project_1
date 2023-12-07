"use client"

import { BlueButtonReversed } from "@/_Components/Buttons/ColoredButtons";
import { Input } from "@/_Components/Inputs/Input";
import Preloader from "@/_Components/Preloader";
import axiosClient from "@/axios-client";
import { useEffect, useState } from "react";


interface ISendData {
    id?: string
    name: string
    phone?: string
    email: string
}


async function updateUserData(setData: Function) {
    await axiosClient.get("/user")
        .then(({ data }) => {
            setData({
                id: data.id,
                name: data.name || "",
                phone: data.phone || "",
                email: data.email
            })
        })
        .catch(error => {
            throw new Error("Can't get user data");
        })
}


export default function DataForm({
    dictionary
}: {
    dictionary: any
}) {

    // данные для отправки формы
    const [data, setData] = useState<ISendData>({
        name: "",
        phone: "",
        email: ""
    });

    useEffect(() => { updateUserData(setData) }, [])



    function _setData(e: React.ChangeEvent<HTMLInputElement>) {
        setData({
            ...data,
            [e.target.id]: e.target.value
        });
    }

    // данные для визуализации формы
    const [side, setSide] = useState({
        errors: {
            name: undefined,
            phone: undefined,
            email: undefined,
        },
        errMessage: undefined,
        sucsess: false
    });


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await axiosClient.post("/user/update", data)
            .then(() => {
                setSide({
                    errors: {
                        name: undefined,
                        phone: undefined,
                        email: undefined,
                    },
                    errMessage: undefined,
                    sucsess: true
                })
            })
            .catch(error => {
                // если нет респонса, значит нет ответа от сервера
                if (error.response === undefined) {
                    console.log(dictionary["server conn propblem"]);

                    return;
                }

                const { response } = error
                // ошибка валидации
                if (response.data.errors === undefined) {
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
            })
    }


    if (data.id == undefined)
        return <Preloader />


    return (
        <div>

            {side.errMessage !== undefined &&
                <p className="text-red-600 border-red-200 border-2 text-justify py-3 px-2 rounded-md">{side.errMessage}</p>
            }

            <form className="w-full xl:w-1/3 mx-auto px-4" onSubmit={handleSubmit}>
                <h3># {data.id}</h3>

                <Input
                    label={dictionary["name"]}
                    value={data.name}
                    id="name"
                    className="mb-2"
                    onChange={_setData}
                    error={side.errors.name}
                />

                <Input
                    label={dictionary["email"]}
                    value={data.email}
                    id="email"
                    className="mb-2"
                    error={side.errors.email}

                    disabled
                />

                <Input
                    label={"phone"}
                    value={data.phone}
                    id="phone"
                    className="mb-4"
                    onChange={_setData}
                    error={side.errors.phone}
                />

                {side.sucsess === false ?
                    <BlueButtonReversed
                        className="py-2 w-full"
                    >
                        {dictionary["submit"]}
                    </BlueButtonReversed>
                    :
                    <p className="py-4 mt-3 text-center border-2 border-green-400 text-green-500 radius-2 rounded-xl">
                        {dictionary["data changed"]}
                    </p>
                }
            </form>
        </div>
    )
}
