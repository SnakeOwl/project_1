"use client"
import { Locale } from "@/i18n-config"
import Modal from "../../_Components/Modal"
import { Input } from "@/_Components/Inputs/Input"
import { useState } from "react"
import FormWrapper from "@/_Components/FormWrapper"
import getDictionaryStatic from "@/utils/get-dictionary-static"


interface IPost {
    offer_id: string
    phone: string
    name: string
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
        phone: "",
        name: ""
    });

    const [errors, setErrors] = useState<any>();

    dict["subscribe text"];
    return (
        <Modal className="2xl:w-1/4 w-full">
            <FormWrapper
                data={data}
                createMode={true}
                createURL="one-click-request"
                updateURL=""
                setGeneralErrors={setErrors}
                submitText={dict["one click form submit"]}
            >
                <p className="text-center mb-2">{dict["one click form text"]}</p>

                <Input
                    id="name"
                    onChange={e => { setData({ ...data, name: e.target.value }) }}
                    value={data.name}
                    label={`${dict["name"]}:`}
                    placeholder="Walter White"
                    className="mb-2"
                    required
                    error={errors?.name || undefined}
                />

                <Input
                    id="phone"
                    onChange={e => { setData({ ...data, phone: e.target.value }) }}
                    value={data.phone}
                    label={`${dict["phone"]}:`}
                    placeholder="+375 22 132 4543"
                    className="mb-2"
                    required
                    error={errors?.phone || undefined}
                />
            </FormWrapper>
        </Modal>
    )
}