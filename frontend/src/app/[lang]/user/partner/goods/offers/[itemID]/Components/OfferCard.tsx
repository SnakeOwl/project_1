"use client"
import { RedButtonReversed } from "@/_Components/Buttons/ColoredButtons"
import { BlueLinkReversed } from "@/_Components/ColoredLinks"
import { RedText } from "@/_Components/text/borderedText"
import AdminCardWrapper from "@/app/[lang]/user/admin/_Components/AdminCardWrapper"
import axiosClient from "@/axios-client"
import IOffer from "@/interfaces/IOffer"
import { useState } from "react"


export default function OfferCard({
    dict,
    offer,
    itemID,
    className = ""
}: {
    dict: any
    offer: IOffer
    itemID: string
    className?: string
}) {
    return (
        <AdminCardWrapper
            removeAPIPath={`user/partner/items/${itemID}/offers/${offer.id}`}
            editLink={`/user/partner/goods/offers/${itemID}/form/${offer.id}`}
            className={className}
        >
            <div className="mb-2">
                {`${dict["price"]}: ${offer.price}`}
            </div>
            {`${dict["count"]}: ${offer.count}`}
        </AdminCardWrapper>
    )
}