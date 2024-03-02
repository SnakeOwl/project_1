"use client"
import Preloader from "@/_Components/Preloader";
import axiosClient from "@/axios-client";
import IUser from "@/interfaces/IUser"
import { useEffect, useState } from "react";
import UserCard from "./UserCard";


function updateUsersList(setUsers: Function) {
    axiosClient.get(`admin/users`)
        .then((response) => {
            const { data } = response;
            console.log(response);
            setUsers(data.data);
        })
        .catch(error => {
            console.log("Error!");
            console.log(error);
        });
}


export default function UserList({
    page
}: {
    page?: string
}) {

    const [users, setUsers] = useState<IUser[]>();

    useEffect(() => {
        updateUsersList(setUsers);
    }, []);


    if (users === undefined)
        return <Preloader />


    return (
        <div className="flex flex-wrap gap-2">
            { users.map((user) => <UserCard key={user.id} className="w-full 2xl:basis-1/5" user={user} />) }
        </div>
    )
}
