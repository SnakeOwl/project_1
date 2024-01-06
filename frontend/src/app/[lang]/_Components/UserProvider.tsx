"use client"
import ReducerUser from "@/context/User/ReducerUser";
import UserContextType from "@/context/User/UserContextType";
import { useReducer } from "react";
import ContextUser from "@/context/User/ContextUser";


export default function UserProvider({
    children
}: {
    children: React.ReactNode
}) {
    // todo: глянуть как делают Контексты на TS
    const updatedStateUser: UserContextType = {
        token: undefined,
        bkey: undefined
    };


    const [stateUser, dispatchUser] = useReducer(ReducerUser, updatedStateUser);
    return (
        <ContextUser.Provider value={{ stateUser, dispatchUser }}>
            {children}
        </ ContextUser.Provider>
    )
}