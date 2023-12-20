"use client"
import { RedButton } from "@/_Components/Buttons/ColoredButtons";
import { RedText } from "@/_Components/text/borderedText";
import axiosClient from "@/axios-client";
import IOneClickRequest from "@/interfaces/IOneClickRequest";
import { useState } from "react";

export default function Card({ request }: { request: IOneClickRequest }) {
    const [removed, setRemoved] = useState<boolean>(false);

    function remove() {
        axiosClient.delete(`admin/one-click-requests/${request.id}`)
            .then((response)=>{
                if (response.status == 204)
                    setRemoved(true);
            })
    }


    if (removed)
        return <RedText className="text-center">Удалено</RedText>


    return (
        <div>

            <div className="rounded-t-lg border border-gray-500 p-2">
                <div className="mb-2">name: {request.name}</div>
                <div className="mb-2">phone: {request.phone}</div>
            </div>
                    <RedButton
                        className="w-full py-2"
                        onClick={remove}
                    >
                        Удалить
                    </RedButton>
        </div>
    )
}