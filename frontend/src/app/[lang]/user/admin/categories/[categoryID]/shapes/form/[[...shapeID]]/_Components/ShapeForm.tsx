"use client"
import FormWrapper from "@/_Components/FormWrapper"
import { Input } from "@/_Components/Inputs/Input"
import IShape from "@/interfaces/IShape"
import { useState } from "react"


interface IPostData {
    name: string
    name_en: string
}

interface IProps {
    categoryID: string
    shape?: IShape
}

export default function ShapeForm({
    categoryID,
    shape
}: IProps) {

    const [data, setData] = useState<IPostData>({
        name: shape?.name || "",
        name_en: shape?.name_en || ""
    });

    const [errors, setErrors] = useState<any>();


    return (
        <FormWrapper
            data={data}
            createMode={shape == undefined}
            createURL={`admin/categories/${categoryID}/shapes`}
            updateURL={shape ? `admin/categories/${categoryID}/shapes/${shape.id}` : ""}
            setGeneralErrors={setErrors}
        >
            <Input
                id="name"
                label="name"
                value={data.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setData({ ...data, name: e.target.value })
                }}

                error={errors?.name}
                required
                
                className="mb-4"
            />

            <Input
                id="name_en"
                label="name_en"
                value={data.name_en}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setData({ ...data, name_en: e.target.value })
                }}

                error={errors?.name_en}
                required 
                
                className="mb-8"
            />
        </FormWrapper>
    )
}
