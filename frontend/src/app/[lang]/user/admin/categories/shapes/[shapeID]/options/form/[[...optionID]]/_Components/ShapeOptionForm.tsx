"use client"
import FormWrapper from "@/_Components/FormWrapper";
import { Input } from "@/_Components/Inputs/Input";
import IOption from "@/interfaces/IOption";
import { useState } from "react";


interface IPostData {
    value: string
    value_en: string
}

interface IProps {
    option?: IOption
    shapeID: string
}

export default function ShapeOptionForm({ option, shapeID }: IProps) {

    const [data, setData] = useState<IPostData>({
        value: option?.value || "",
        value_en: option?.value_en || ""
    })

    const [errors, setErrors] = useState<any>();

    return (
        <FormWrapper
            data={data}
            createMode={option == undefined}
            createURL={`admin/shapes/${shapeID}/options`}
            updateURL={option ? `admin/shapes/${shapeID}/options/${option.id}` : ""}
            setGeneralErrors={setErrors}
        >
            <Input
                id="value"
                label="value"
                value={data.value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setData({ ...data, value: e.target.value })
                }}

                error={errors.value}
                required
            />

            <Input
                id="value_en"
                label="value_en"
                value={data.value_en}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setData({ ...data, value_en: e.target.value })
                }}

                error={errors.value_en}
                required
            />
        </FormWrapper>
    )
}