"use client"
import { BlueButton, BlueButtonReversed } from "@/_Components/Buttons/ColoredButtons";
import { useContext, useState } from "react"
import SubscribeForm from "./SubscribeArea/SubscribeForm";

interface Props {
    offerID: number| string
    dict: any
}

export default function SubscribeArea({
    offerID,
    dict
}:Props ) {
    
    const [formIsActive, setFormIsActive] = useState(false);

    if (formIsActive)
        return <SubscribeForm 
            dict={dict}
            offerID={offerID} 
        />


    return (
        <BlueButton
            onClick={()=>setFormIsActive(true)}
            className="py-2 rounded w-full"
        >
            {dict["subscribe"]}
        </BlueButton>
    )
}