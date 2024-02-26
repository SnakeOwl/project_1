"use client"
import axiosClient from "@/axios-client";
import ISubscriber from "@/interfaces/ISubscriber";
import { useEffect, useState } from "react";
import AdminCardWrapper from "../../_Components/AdminCardWrapper";
import IPaginatedResourse from "@/interfaces/IPaginatedResourse";


async function getSubscribers(): Promise<IPaginatedResourse> {
    const { data } = await axiosClient.get("admin/subscriptions");
    return data;
}


export default function Subscribers() {
    const [subs, setSubs] = useState<ISubscriber[]>();

    useEffect(() => {
        (async () => {
            setSubs( (await getSubscribers()).data );
        })();
    }, []);

    return (
        <div className="flex flex-wrap">
            {subs?.map(sub => 
                <div className="p-2">

                    <AdminCardWrapper
                        editLink="form"
                        removeAPIPath={`admin/subscriptions/${sub.id}`}
                    >
                        <div>email: {sub.email}</div>
                    </AdminCardWrapper>
                </div>

            )
            }
        </div>
    )
}