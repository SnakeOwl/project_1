"use client"
import { RedButton, RedButtonReversed } from "./ColoredButtons";
import axiosClient from "@/axios-client";
import ContextUser from "@/context/User/ContextUser";
import { useContext, useState } from "react"


export default function ToBusketButton({
    offerID,
    className,
    children
}: {
    offerID: string | number
    className?: string
    children: React.ReactNode
}) {
    
    const [inBasket, setInBasket] = useState(false);
    const [error, setError] = useState(false);
    const {dispatchUser} = useContext(ContextUser);


    async function handleClick(){
        const bkey = localStorage.getItem("bkey") || null;

        await axiosClient.get(`/basket/add/${offerID}`, {
            params: { key: bkey }
        })
        .then( ({data})=>{
            setInBasket(true);

            if(bkey === null){
                dispatchUser({
                    type: "SET_BKEY",
                    bkey: data.bkey
                });

                localStorage.setItem("bkey", data.bkey);
            }
        })
        .catch(error => {
            console.log(error);
            setError(true);
        });
    }


    // произошла ошибка
    if (error)
        return <i className="bi bi-x-square"></i>


    // товар добавлен
    if (inBasket)
        return <RedButtonReversed className={className}>I Love You ❤</RedButtonReversed>

        
    return (
        <RedButton
            className={className}
            onClick={handleClick}
        >
            {children}
        </RedButton>
    )
}