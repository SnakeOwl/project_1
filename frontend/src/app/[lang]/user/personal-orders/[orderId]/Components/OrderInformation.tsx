"use client"
import IOrder from "@/interfaces/IOrder";
import GeneralInfo from "./GeneralInfo"
import ListOfOffers from "./ListOfOffers"
import axiosClient from "@/axios-client";
import { useContext, useEffect, useState } from "react";
import Preloader from "@/Components/Preloader";


// не могу получить информацию на серверных компонентах, так как нужно localStorage
function getOrder(orderId: string, setOrder: Function){
    axiosClient.get(`/user/orders/${orderId}`)
        .then(({ data }) => {
            setOrder(data.order)
        })
        .catch(() => {
            console.log("can't get Order data from API");
        })
}


export default function OrderInformation({
    dictionary,
    orderId
}: {
    orderId: string,
    dictionary: any
}) {

    const [order, setOrder] = useState<IOrder>();

    useEffect(()=>{
        getOrder(orderId, setOrder)
    }, []);


    if (order === undefined)
        return <Preloader />

        

    return (
        <>
            <h2 className="text-center mb-4">
                {dictionary["general information"]}
            </h2>

            <GeneralInfo
                dictionary={dictionary}
                order={order}
            />

            <h2 className="text-center mt-8 mb-4">
                {dictionary["list of offers in order"]}
            </h2>

            <ListOfOffers
                offers={order.basket.offers}
                dictionary={dictionary}
            />
        </>
    )
}