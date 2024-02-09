"use client"

import CardWrapper from "@/_Components/CardWrapper";
import Img from "@/_Components/Img";
import axiosClient from "@/axios-client";
import IOrder from "@/interfaces/IOrder";
import Link from "next/link";
import { useEffect, useState } from "react"


async function getOrder(orderID: string): Promise<IOrder> {
    return await axiosClient.get(`admin/orders/${orderID}`)
        .then(({ data }) => {
            return data;
        })
}


export default function OrderForm({ orderID }: { orderID: string }) {

    const [order, setOrder] = useState<IOrder>();

    useEffect(() => {
        (async () => {
            const data = await getOrder(orderID);
            setOrder(data);
        })()
    }, []);


    return (
        <div>
            <section>
                <div className="mb-2">Статус заказа: {order?.status}</div>

                <div className="mb-2">Имя: {order?.name}</div>
                <div className="mb-2">email: {order?.email}</div>
                <div className="mb-2">Телефон: {order?.phone}</div>
                <div className="mb-2">Почтовый индекс: {order?.post_index}</div>

                <div className="mb-2">Дата заказа: {order?.created_at}</div>

                <div className="mb-2">Способ оплаты: {order?.payment_method}</div>
                <div className="mb-2">
                    Статус оплаты: &nbsp;
                    {order?.payment_status == false
                        ? <span className="text-red-700">Не оплачено</span>
                        : <span className="text-green-700">Оплачено</span>
                    }
                </div>

                <div className="mb-2">Способ доставки: {order?.delivery_method}</div>
                <div className="mb-2">Адрес: {order?.address}</div>
                <div className="mb-2">
                    Статус доставки: &nbsp;
                    {order?.date_delivered == null
                        ? <span className="text-red-700">Не доставлено</span>
                        : <span className="text-green-700">Доставлено</span>
                    }
                </div>
            </section>

            <h2>Заказанные предложения</h2>
            <section>
                {order?.offers?.map(offer =>
                    <CardWrapper className="w-full md:w-1/2 2xl:w-1/4">
                        <Img src={offer.short_image} className=" h-full w-full object-cover rounded-lg" />
                        <section className="mt-2">
                            <Link href={`/offer/${offer.id}`}>{offer.item?.name}</Link>
                            <div>Количество: {offer.pivot?.count}</div>
                            <div>Цена: {offer.price}</div>
                        </section>
                    </CardWrapper>)
                }
            </section>
        </div>
    )
}