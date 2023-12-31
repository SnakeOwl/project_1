"use client"
import { BlueButton } from "@/_Components/Buttons/ColoredButtons";
import FormWrapper from "@/_Components/FormWrapper";
import { Input } from "@/_Components/Inputs/Input";
import Modal from "@/_Components/Modal";
import { useState } from "react";


interface IPost {
    offer_id: string
    email: string
}


export default function SubscribeModule({ dict, offerID }
    : { dict: any, offerID: string }) {
    
    const [hidden, setHidden] = useState<boolean>(true);

    const [data, setData] = useState<IPost>({
        offer_id: offerID,
        email: ""
    });

    const [errors, setErrors] = useState<any>();


    if (hidden)
        return (
            <BlueButton
                className="w-full py-2 text-center rounded-lg"
                onClick={()=>setHidden(false)}
            >
                {dict["subscribe"]}
            </BlueButton>
        )


    return (
        <Modal 
            className="w-full 2xl:w-1/4"
            onClickWrapper={()=>setHidden(true)}
        >
            <FormWrapper
                data={data}
                createMode={true}
                createURL="subscribe"
                setGeneralErrors={setErrors}
                submitText={<i className="bi bi-envelope-check-fill"></i>}
            >
                <Input
                    id="email"
                    type="email"
                    onChange={e => { setData({ ...data, email: e.target.value }) }}
                    value={data.email}
                    label={`${dict["email"]}:`}
                    placeholder="WalterWhite@gmail.com"
                    className="mb-2"
                    required
                    error={errors?.email || undefined}
                />
                <p className="text-center mb-2">{dict["subscribe text"]}</p>
            </FormWrapper>
        </Modal>
    )
}