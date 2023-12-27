"use client"

import { RedButtonReversed } from "@/_Components/Buttons/ColoredButtons"
import { BlueLinkReversed } from "@/_Components/Links/ColoredLinks"
import { RedText } from "@/_Components/text/borderedText"
import axiosClient from "@/axios-client"
import { useState } from "react"
import CardWrapper  from "@/_Components/CardWrapper"


export default function AdminCardWrapper({
    removeAPIPath,
    editLink,
    children,
}: {
    removeAPIPath: string
    editLink: string
    children: React.ReactNode
}) {
    const [removed, setRemoved] = useState<boolean>(false);


    function removeRequest() {
        if (!confirm("Удалить элемент?"))
            return;

        axiosClient.delete(removeAPIPath)
            .then(() => { setRemoved(true) })
            .catch(error => { throw new Error("Can't delete.") })
    }


    if (removed)
        return <RedText>Удалено</RedText>;


    return (
        <CardWrapper>

            {children}

            <div className="flex space-x-2">
                <BlueLinkReversed
                    href={editLink}
                    className="w-3/4 py-2 text-center rounded-l-md" >
                    <i className="bi bi-gear-fill"></i>
                </BlueLinkReversed>

                <RedButtonReversed
                    className="w-1/4 py-1 rounded-r-md"
                    onClick={removeRequest}
                    >
                    <i className="bi bi-x-lg"></i>
                </RedButtonReversed>
            </div>
        </CardWrapper>
    )
}
