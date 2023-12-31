import { RedButtonReversed } from "@/_Components/Buttons/ColoredButtons";
import FormWrapper from "@/_Components/FormWrapper";
import { Input } from "@/_Components/Inputs/Input";
import Modal from "@/_Components/Modal";
import { useState } from "react"

export default function OneClickButton({ dict, offerID }
    : { dict: any, offerID: string }) {

    const [hidden, setHidden] = useState<boolean>(true);

    const [data, setData] = useState<{
        offer_id: string
        phone: string
        name: string
    }>({
        offer_id: offerID,
        phone: "",
        name: ""
    });


    const [errors, setErrors] = useState<any>();


    if (hidden)
        return (
            <RedButtonReversed
                className={"py-2 px-3 rounded-md"}
                onClick={() => setHidden(false)}
            >
                <i className="bi bi-hand-index-thumb"></i>
            </RedButtonReversed>
        )


    return (
        <Modal
            className="w-full 2xl:w-1/4"
            onClickWrapper={() => setHidden(true)}
        >
            <FormWrapper
                data={data}
                createMode={true}
                createURL="one-click-request"
                setGeneralErrors={setErrors}
                submitText={dict["one click form submit"]}
            >
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