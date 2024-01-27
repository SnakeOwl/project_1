"use client"
import { RedButton, RedButtonReversed } from "./ColoredButtons";
import axiosClient from "@/axios-client";
import { useState } from "react"
import Basket from "@/classes/Basket";

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
    const basket = new Basket();
    
    async function handleClick(){

        const key = basket.getKey();

        await axiosClient.get(`/basket/add/${offerID}`, {
            params: { key: key || null }
        })
        .then(({data})=>{
            setInBasket(true);
            basket.setKey(data.bkey);
        })
        .catch(error => {
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