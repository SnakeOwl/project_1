"use client"
import IOneClickRequest from "@/interfaces/IOneClickRequest";
import Card from "./Card";
import { useEffect, useState } from "react";
import axiosClient from "@/axios-client";

export default function RequestList() {

    const [requests, setRequests] = useState<IOneClickRequest[]>()

    useEffect(() => {
        axiosClient.get("admin/one-click-requests")
            .then(({ data }) => {
                setRequests(data.data);
            })
            .catch(error => {
                throw new Error("Can't get requests from server.");
            })
    }
        , []);


    return (
        <div className="flex flex-wrap space-x-2">
            {requests?.map(request =>
                <div className="2xl:w-1/6 w-full" key={request.id}>
                    <Card request={request} />
                </div>
            )
            }
        </div>
    )
}