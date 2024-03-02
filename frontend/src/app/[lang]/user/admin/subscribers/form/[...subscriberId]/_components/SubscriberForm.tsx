"use client"

import axiosClient from "@/axios-client"
import ISubscriber from "@/interfaces/ISubscriber";
import { useEffect, useState } from "react";

async function getSub(id: string): Promise<ISubscriber>{
    const {data} = await axiosClient.get(`admin/subscriptions/${id}`);
    return data;
}


export default function SubscriberForm({
    subscriberId
}: {subscriberId?: string}){
    
    const [sub, setSub] = useState<ISubscriber>();


    useEffect(()=>{
        if (subscriberId != undefined){
            (async ()=>{
                setSub(await getSub(subscriberId))
            })();
        }
    }, [])


    return (
        <div>
            asdf
        </div>
    )
}