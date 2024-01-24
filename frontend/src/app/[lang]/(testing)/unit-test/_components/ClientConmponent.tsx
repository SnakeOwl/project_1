"use client"

import fetchClient from "@/fetch-client";
import { useEffect } from "react"


async function getOfferIds(){
    const response = await fetchClient.get("get/offers/all-ids")
    
    switch (response.status){
        case 200: 
            const {jsonData} = response;
            const result = jsonData.map((off: {id: string})=>{return {offerID: off.id}});
            return result;
            break;
        
        return [];
    }
}

export default function ClientComponent(){

    useEffect( ()=>{
        ( async ()=>{
            const rr = await getOfferIds()
            console.log(rr);
        })();

        
    }, [])


    return (
        <div>
            ClientComponent
        </div>
    )
}