"use client"
import Pagination from "@/Components/Paginations/Pagination";
import axiosClient from "@/axios-client";
import { useContext, useEffect, useState } from "react";
import IPaginationLink from "@/interfaces/IPaginationLink";
import IOrder from "@/interfaces/IOrder";
import Link from "next/link";


function updateActiveOrders(
    setState: Function,
    setLinks: Function
) {
    axiosClient.get("user/orders")
        .then(({ data }) => {
            setState(data.orders.data);
            setLinks(data.orders.links);
        })
        .catch(() => {
            console.log("can't get orders from API");
        })
}


interface IProps {
    dict: any
}


export default function OrdersList({dict}: IProps) {

    const [orders, setOrders] = useState<IOrder[]>([]);
    const [links, setLinks] = useState<IPaginationLink[]>([]);


    useEffect(() => {
        updateActiveOrders(setOrders, setLinks);
    }, []);


    const tdClasses = "border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400"


    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <td className={tdClasses}>#</td>
                        <td className={tdClasses}>{dict["delivery method"]}</td>
                        <td className={tdClasses}>{dict["status"]}</td>
                        <td className={tdClasses}>{dict["price"]}</td>
                    </tr>
                </thead>

                <tbody>
                    { orders.map(order => {
                            return (
                                <tr key={order.id}>
                                    <td className={tdClasses}>
                                        <Link href={`/user/personal-orders/${order.id}`}>
                                            {order.id}
                                        </Link>
                                    </td>
                                    <td className={tdClasses}>{order.delivery_method}</td>
                                    <td className={tdClasses}>{order.status}</td>
                                    <td className={tdClasses}>{order.price}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>

            <Pagination
                setState={setOrders}
                links={links}
                index="orders"
                className="mt-4"
            />
        </div>
    )
}