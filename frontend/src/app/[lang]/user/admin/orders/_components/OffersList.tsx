"use client"
import IOrder from "@/interfaces/IOrder";
import { useEffect, useState } from "react";
import AdminCardWrapper from "../../_Components/AdminCardWrapper";
import axiosClient from "@/axios-client";
import IPaginatedResourse from "@/interfaces/IPaginatedResourse";


// нужен токен от пользователя
// функция должна запускаться в useEffect
async function getOrders(): Promise<IPaginatedResourse>{
    return await axiosClient.get("admin/orders").then(({data})=>{
        return data
    });

    throw new Error("Can't get Orders from server.")
}


export default function OffersList() {

    const [orders, setOrders] = useState<IOrder[]>();


    useEffect(() => {
        (async () => {
            const data = await getOrders();
            setOrders(data.data);
        })()
    }, []);

    return (
        <div className="flex flex-wrap gap-2">
            {orders?.map(order =>
                <AdminCardWrapper
                    key={order.id}
                    editLink={`/user/admin/orders/${order.id}`}
                    removeAPIPath={`/admin/orders/${order.id}`}
                    className="w-full md:w-1/2 2xl:w-1/4"
                >
                    <div className="mb-2">
                        {order.name}
                        {order.email}
                    </div>
                    <div className="mb-2">
                        {order.delivery_method}
                    </div>
                    {order.payment_status == false
                    ? <div className="text-red-700">Не оплачено</div>
                    : <div className="text-green-700">Оплачено</div>
                    }
                </AdminCardWrapper>
            )
            }
        </div>
    );
}