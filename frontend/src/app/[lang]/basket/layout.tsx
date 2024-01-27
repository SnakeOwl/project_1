"use client"
import ContextUser from "@/context/User/ContextUser";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function BasketLayout({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter();
    const {stateUser} = useContext(ContextUser);

    // ПЕРЕНАПРАВЛЕНИЕ, если у пользователя нет товара в корзине
    useEffect(() => {        
        if (typeof stateUser.bkey != "string") 
            router.push("/catalog");
        
    }, [stateUser.bkey]);


    return (
        <div>
            {children}
        </div>
    )
}