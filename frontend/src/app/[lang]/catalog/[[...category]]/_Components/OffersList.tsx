"use client"

import IOffer from "@/interfaces/IOffer"
import Card from "./Card"
import Pagination from "./Pagination"
import { useContext, useEffect, useState } from "react";
import axiosClient from "@/axios-client";
import ContextCatalog from "@/context/Catalog/ContextCatalog";
import Loading from "../loading";


export default function OfferList({
    dict,
    category
}: {
    dict: any
    category?: string[]
}) {

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


    //loadnig.tsx подтягивается сам, только если page.tsx это async функция
    if (offers.data == false)
        return <Loading />


    return (
        <>
            <main className="flex flex-wrap justify-around gap-4 mb-4 px-2">
                { offers.data.map((offer: IOffer) =>
                    <Card
                        key={`offer-${offer.id}`}
                        offer={offer}
                        dict={dict}
                    />
                    )
                }

            </main>
            <Pagination links={offers.links} />
        </>
    )
}