"use client"
import IOffer from "@/interfaces/IOffer";
import { useEffect, useState } from "react";
import Card from "./Card";
import Preloader from "@/_Components/Preloader";
import axiosClient from "@/axios-client";


export default function CardsList({ dict }: { dict: any }) {

    const [offers, setOffers] = useState<IOffer[]>([]);

    async function updateOffers() {
        await axiosClient.get("/basket/index", {
            params: { key: localStorage.getItem("bkey") }
        })
            .then(({ data }) => {
                setOffers(() => { return data.offers });
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        updateOffers();
    }, [])


    // заглушка на первичную подгрузку корзины
    if (offers.length === 0)
        return <Preloader />


    return (
        <div className="flex justify-around">
            {
                offers.map(offer =>
                    <Card
                        key={offer.id}
                        offer={offer}
                        updateOffers={updateOffers}
                        dict={dict}
                    />
                )
            }
        </div>
    )
}



