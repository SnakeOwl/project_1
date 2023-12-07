"use client"

import { RedButtonReversed } from "@/_Components/Buttons/ColoredButtons";
import { BlueLinkReversed } from "@/_Components/Links/ColoredLinks";
import { RedText } from "@/_Components/text/borderedText";
import axiosClient from "@/axios-client";
import IUser from "@/interfaces/IUser";
import { useState } from "react";


interface IProps {
    user: IUser
}


export default function UserCard( {user}: IProps){
    const [deleted, setDeleted] = useState<boolean>(false);

    function removeUser(userID: string) {
        if (!confirm("Удалить пользователя?"))
            return;

        axiosClient.delete(`api/admin/users/${userID}`)
            .then(({ status }) => {
                if (status === 204)
                    setDeleted(true)

            })
            .catch(error => {
                alert("Can't delete user. See console");
            });
    }


    if(deleted){
        return (
            <RedText>
                Пользователь удалён
            </RedText>
        );
    }


    return (
        <div className="border border-gray-500 p-2">
            <div className="mb-2">
                {`#${user.id} ${user.name}`}
            </div>

            <div className="mb-2">
                {user.email}
            </div>

            <div className="mb-2">
                {user.phone || ""}
            </div>

            <div className="flex">
                <BlueLinkReversed
                    href={`/user/admin/users/form/${user.id}`}
                    className="w-3/4 py-2 text-center rounded-md mx-2" >
                    <i className="bi bi-gear-fill"></i>
                </BlueLinkReversed>

                <RedButtonReversed
                    className="w-1/4 py-1 rounded-md mx-2"
                    onClick={() => { removeUser(user.id) }}>
                    <i className="bi bi-x-lg"></i>
                </RedButtonReversed>
            </div>
        </div>
    );
}