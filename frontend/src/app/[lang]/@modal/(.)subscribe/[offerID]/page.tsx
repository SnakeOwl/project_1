"use client"
import { Locale } from "@/i18n-config"
import Modal from "../../_Components/Modal"
import { Input } from "@/_Components/Inputs/Input"
import { useState } from "react"
import FormWrapper from "@/_Components/FormWrapper"
import getDictionaryStatic from "@/utils/get-dictionary-static"


interface IPost {
    offer_id: string
    email: string
}


export default function SubscribePage({
    params: { lang, offerID }
}: {
    params: {
        lang: Locale
        offerID: string
    }
}) {
    const dict = getDictionaryStatic(lang);
    const [data, setData] = useState<IPost>({
        offer_id: offerID,
        email: ""
    });

    const [errors, setErrors] = useState()

    dict["subscribe text"];
    return (
        <Modal className="w-full 2xl:w-1/4">
            <FormWrapper
                data={data}
                createMode={true}
                createURL="subscribe"
                updateURL=""
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
                />
                <p className="text-center mb-2">{dict["subscribe text"]}</p>
            </FormWrapper>
        </Modal>
    )
}