"use client"

import IOffer from "@/interfaces/IOffer"
import Pagination from "./Pagination"
import { useContext, useEffect } from "react";
import axiosClient from "@/axios-client";
import ContextCatalog from "@/context/Catalog/ContextCatalog";
import dynamic from "next/dynamic";
import { CardLoader } from "../loading"
import Loading from "../loading";
import { useRouter, useSearchParams } from "next/navigation";


export default function OfferList({
    dict,
    category
}: {
    dict: any
    category?: string[]
}) {

    const { stateCatalog, dispatchCatalog } = useContext(ContextCatalog);
    const { offers } = stateCatalog;

    const searchParams = useSearchParams();
    const router = useRouter();

    // подгрузка Офферов
    useEffect(() => {

        const page = searchParams.get('page') || "1";
        const searchOptions = searchParams.get('options')?.split(',');

        axiosClient.get(`catalog`, {
            params: {
                options: searchOptions,
                page: page,
                category_alias: category || null
            }
        }).then(({ data }) => {

                // Если page > чем выдаваемое число страниц, то laravel ошибку не выдаёт
                if (data.offers.current_page > data.offers.last_page)
                    router.push("/");

                dispatchCatalog({
                    type: "SET_OFFERS_AND_ACTIVE_OPTIONS",
                    offers: data.offers,
                    activeOptions: data.options
                });

            })
            .catch(({ response }) => {
                if (response.status == 404)
                    router.push("/");
            });

    }, [searchParams, category]);


    const WithCustomLoading = dynamic(
        () => import("./Card"),
        {
            loading: () => <CardLoader />,
        }
    )

    //loadnig.tsx подтягивается сам, только если page.tsx это async функция
    if (offers.data == false)
        return <Loading />


    return (
        <>
            <main className="flex flex-wrap justify-around gap-4 mb-4 px-2">
                {offers.data.map((offer: IOffer) =>
                    <WithCustomLoading
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