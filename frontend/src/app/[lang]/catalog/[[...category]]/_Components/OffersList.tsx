"use client"

import IOffer from "@/interfaces/IOffer"
import Card from "./Card"
import Pagination from "./Pagination"
import { useContext, useEffect, useState } from "react";
import axiosClient from "@/axios-client";
import ContextCatalog from "@/context/Catalog/ContextCatalog";


interface IProps {
    category: string[]
    dict: any
}


export default function OfferList({
    dict,
    category
}: IProps ) {

    const { stateCatalog, dispatchCatalog } = useContext(ContextCatalog);
    const { offers } = stateCatalog;


    // подгрузка Офферов
    useEffect(() => {
        const activeCategory = category === undefined ? null : category[0];

        axiosClient.get("catalog", { params: { category: activeCategory } })
            .then(({ data }) => {
                dispatchCatalog({
                    type: "SET_OFFERS",
                    offers: data.offers
                });
            })
    }, []);



    return (
        <>
            <main className="flex flex-wrap justify-around">
                {
                    offers.data.map((offer: IOffer) => {
                        return (
                            <Card
                                key={`offer-${offer.id}`}
                                offer={offer}
                                dict={dict}
                            />
                        )
                    })
                }

            </main>
            <Pagination links={offers.links} />
        </>
    )
}