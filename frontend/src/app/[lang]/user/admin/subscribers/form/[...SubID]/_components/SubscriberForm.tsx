"use client"

import axiosClient from "@/axios-client"
import ISubscriber from "@/interfaces/ISubscriber";
import { useEffect, useState } from "react";

async function getSub(id: string): Promise<ISubscriber>{
    const {data} = await axiosClient.get(`admin/subscriptions/${id}`);
    return data;
}


export default function SubscriberForm(params: {props: {SubID?: string}}){
    
    const [sub, setSub] = useState<ISubscriber>();


    useEffect(()=>{
        const id = params.props.SubID;
        if (id != undefined){
            (async ()=>{
                setSub(await getSub(id) )
            })();
        }
    }, [])


    return (
        <div>
            
        </div>
    )
}