"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OneClickFormPage({
    params: {offerID}
}: {
    params: {
        offerID: string
    }
}) {
    const router = useRouter();
    
    useEffect( ()=>{
        router.replace(`/offer/${offerID}`);
    } , [])
}