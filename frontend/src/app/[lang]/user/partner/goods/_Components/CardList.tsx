"use client"

import { BlueLink } from "@/_Components/ColoredLinks";
import axiosClient from "@/axios-client";
import IItem from "@/interfaces/IItem";
import { useEffect, useState } from "react";
import Card from "./Card";


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



export default function CardList({ dict }: {dict: any}) {

    const [goods, setGoods] = useState<IItem[]>([]);

    useEffect(() => {
        getGoods(setGoods);
    }, []);


    return (
        <div className="flex space-around">
            <div className="2xl:w-1/5 px-2">
                <BlueLink
                    href="/user/partner/goods/form"
                    className="w-full text-center  py-16 rounded-lg">
                    <i className="bi bi-plus-lg"></i>
                </BlueLink>
            </div>

            {goods.map(item =>
                <Card
                    key={item.id}
                    setGoods={setGoods}
                    dict={dict}
                    item={item}
                />
            )
            }
        </div>
    )
}