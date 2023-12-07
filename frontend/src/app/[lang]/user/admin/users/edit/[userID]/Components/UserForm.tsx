"use client"
import { BlueButtonReversed } from "@/_Components/Buttons/ColoredButtons";
import { Input } from "@/_Components/Inputs/Input";
import Preloader from "@/_Components/Preloader";
import axiosClient from "@/axios-client";
import IUser from "@/interfaces/IUser"
import { useEffect, useState } from "react"


async function updateUserByID(userID: string, setUser: Function){
    await axiosClient.get(`admin/users/${userID}`)
        .then(({data})=>{
            setUser(data);
        })
        .catch(error=>{
            console.log("Can't get user from server. ", error);
        })
}


interface IProps{
    userID: string
}


export default function UserForm({
    userID
}: IProps){

    const [user, setUser] = useState<IUser>();
    

    useEffect(()=>{
        updateUserByID(userID, setUser);
    }, []);


    // данные для визуализации формы
    const [side, setSide] = useState({
        errors: {
            phone: undefined,
            email: undefined
        },
        errMessage: undefined,
        sucsess: false
    });


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        await axiosClient.patch(`admin/users/${userID}`, user)
            .then(() => {
                setSide({
                    errors: {
                        phone: undefined,
                        email: undefined
                    },
                    errMessage: undefined,
                    sucsess: true
                });
            })
            .catch(error => {
                // если нет респонса, значит нет ответа от сервера
                if (error.response === undefined) {
                    console.log("Server connection problem");

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


    if (user === undefined)
        return <Preloader />


    return (
        <div>
            {side.errMessage !== undefined &&
                <p className="text-red-600 border-red-200 border-2 text-justify py-3 px-2 rounded-md">{side.errMessage}</p>
            }

            <form className="w-full xl:w-1/3 mx-auto px-4" onSubmit={handleSubmit}>
                <h3># {user.id}</h3>

                <Input
                    label="name"
                    value={user.name}
                    className="mb-2"
                    disabled
                />

                <Input
                    label="email"
                    type="email"
                    value={user.email}
                    className="mb-2"
                    onChange={(e: React.ChangeEvent<HTMLInputElement> )=>{setUser({...user, email: e.target.value})}}
                    error={side.errors.email}
                />

                <Input
                    label="phone"
                    value={user.phone}
                    className="mb-4"
                    onChange={(e: React.ChangeEvent<HTMLInputElement> )=>{setUser({...user, phone: e.target.value})}}
                    error={side.errors.phone}
                />

                {side.sucsess === false ?
                    <BlueButtonReversed
                        className="py-2 w-full"
                    >
                        Изменить пользователя
                    </BlueButtonReversed>
                    :
                    <p className="py-4 mt-3 text-center border-2 border-green-400 text-green-500 radius-2 rounded-xl">
                        Пользователь изменён
                    </p>
                }
            </form>
        </div>
    )
}