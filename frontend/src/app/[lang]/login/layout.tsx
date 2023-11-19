"use client"

import ContextUser from "@/context/User/ContextUser";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";


function useRedirect(){
    // перенаправление, если пользователь уже есть в приложении
    const { stateUser } = useContext(ContextUser);
    const router = useRouter();
    
    useEffect(() => {
        if (stateUser.token !== undefined)
            router.push("/user/personal-data") // redirect
    }, [stateUser.token]);
}


export default function GuestLayout({
    children
}: {
    children: React.ReactNode
}) {
    
    useRedirect();


    return (
        <div className="w-full">
            {children}
        </div>
    )
}