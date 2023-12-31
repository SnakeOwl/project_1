"use client"
import { RedButtonReversed } from "@/_Components/Buttons/ColoredButtons"
import { BlueLinkReversed } from "@/_Components/ColoredLinks"
import { RedText } from "@/_Components/text/borderedText"
import axiosClient from "@/axios-client"
import IOffer from "@/interfaces/IOffer"
import { useState } from "react"

interface IProps {
    dict: any
    offer: IOffer
    itemID: string
}


export default function OfferCard({
    dict,
    offer,
    itemID
}: IProps) {
    const [removed, setRemoved] = useState<boolean>(false);


    function removeOffer(itemID: string, offerID: string) {
        axiosClient.delete(`user/partner/items/${itemID}/offers/${offerID}`)
            .then(({ status }) => {
                if (status == 204)
                    setRemoved(true);
            })
    }

    if(removed){
        return (
            <RedText className="">
                {dict["removed"]}
            </RedText>
        );
    }


    return (
        <div className="border border-gray-500 rounded-md p-2">
            <div className="mb-4">
                <div className="mb-2">
                    {`${dict["price"]}: ${offer.price}`}
                </div>
                {`${dict["count"]}: ${offer.count}`}
            </div>

            <div className="flex text-xs">
                <BlueLinkReversed
                    href={`/user/partner/goods/offers/${itemID}/form/${offer.id}`}
                    className="w-3/4 py-2 text-center rounded-md mx-2" >
                    <i className="bi bi-gear-fill"></i>
                </BlueLinkReversed>

                <RedButtonReversed
                    className="w-1/4 py-1 rounded-md mx-2"
                    onClick={() => { removeOffer(itemID, offer.id) }}>
                    <i className="bi bi-x-lg"></i>
                </RedButtonReversed>
            </div>
        </div>
    )
}