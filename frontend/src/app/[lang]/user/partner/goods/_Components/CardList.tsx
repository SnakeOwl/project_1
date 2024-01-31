"use client"

import axiosClient from "@/axios-client";
import IItem from "@/interfaces/IItem";
import { useEffect, useState } from "react";
import Card from "./Card";
import BigPlusLink from "../../../_Components/BigPlusLink";


function getGoods(setGoods: Function) {
    axiosClient.get("user/partner/items")
        .then((response) => {
            const { status } = response;

            // У пользователя 0 товаров для продажи
            if (status === 204)
                return false;

            setGoods(response.data);
        })
        .catch(() => {
            throw new Error("Error! Can't get items from server.")
        })
}



export default function CardList({ dict }: { dict: any }) {

    const [goods, setGoods] = useState<IItem[]>([]);

    useEffect(() => {
        getGoods(setGoods);
    }, []);


    return (
        <div className="flex flex-wrap space-around gap-4 justify-around">
            <div className="w-full 2xl:w-1/5">
                <BigPlusLink href="/user/partner/goods/form" />
            </div>

            {goods.map(item =>
                <Card
                    key={item.id}
                    dict={dict}
                    item={item}
                />
            )
            }
        </div>
    )
}