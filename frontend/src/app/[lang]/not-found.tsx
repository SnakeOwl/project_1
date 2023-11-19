"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// 404 error
export default function NotFound() {

    const router = useRouter();

    useEffect(()=>{
        router.push("/catalog");
    })


    return (
        <div className='text-center'>
            <p>Error 404 :(</p>
        </div>
    )
}