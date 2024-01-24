"use client"
import ContextUser from "@/context/User/ContextUser";
import { useContext, useEffect } from "react";
import getUser from "./getUser";


// функция должна вызываться с доступом к UserProvider
export default function SynchronizeUser (){
    const { dispatchUser } = useContext(ContextUser);

    useEffect(() => {
        // обновление данных о пользователе
        if (localStorage.getItem("ACCESS_TOKEN") !== null) {
            Promise.resolve(getUser())
                .then((user) => {
                    if (user === false) {
                        console.log("Error! Can't update user information.");
                        return false;
                    }

                    dispatchUser( {
                        type: "SET",
                        token: localStorage.getItem("ACCESS_TOKEN"),
                        user: user,
                        bkey: localStorage.getItem("bkey") || undefined
                    })
                })
                .catch(error => {
                    console.log("Error! Can't update user information.");
                })
        } else {
            dispatchUser({
                type: "SET_BKEY",
                bkey: localStorage.getItem("bkey") || undefined
            });
        }
    }, []);
}