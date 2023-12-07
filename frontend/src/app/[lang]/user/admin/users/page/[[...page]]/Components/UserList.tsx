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


interface IProps {
    page?: string
}


export default function UserList({
    page
}: IProps) {

    const [users, setUsers] = useState<IUser[]>();

    useEffect( ()=>{
        updateUsersList(setUsers);
    }, []);


    if (users === undefined)
        return <Preloader />


    return (
        <div className="flex flex-wrap">
            {users.map((user) => {
                return (
                    <div className="2xl:w-1/6 px-2" key={user.id}>
                        <UserCard user={user} />
                    </div>
                );
            })
            }
        </div>
    )
}