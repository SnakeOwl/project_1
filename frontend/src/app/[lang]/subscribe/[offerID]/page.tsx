"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SubscribePage() {
    const router = useRouter();
    
    useEffect( ()=>{
        router.replace("/offer/1")
    } , [])
}