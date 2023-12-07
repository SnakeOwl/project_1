"use client"
import FormWrapper from "@/_Components/FormWrapper";
import { Input } from "@/_Components/Inputs/Input";
import ICategory from "@/interfaces/ICategory";
import { useState } from "react";


interface PostData {
    name: string
    name_en: string
    alias: string
}


interface IProps {
    category?: ICategory
}

export default function CategoryForm({ category }: IProps) {

    const [data, setData] = useState<PostData>({
        name: category?.name || "",
        name_en: category?.name_en || "",
        alias: category?.alias || "",
    });

    const [errors, setErrors] = useState<any>();


    return (
        <FormWrapper
            data={data}
            createMode={category == undefined}
            createURL="admin/categories"
            updateURL={category? `admin/categories/${category.id}`: ""}
            setGeneralErrors={setErrors}
        >
            <Input
                id="name"
                label="name"
                value={data.name}

                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { 
                    setData({ ...data, name: e.target.value }) }}
                error={errors?.name || undefined}
                required
            />

            <Input
                id="name_en"
                label="name_en"
                value={data.name_en}
                className="mb-2"

                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { 
                    setData({ ...data, name_en: e.target.value }) }}
                error={errors?.name || undefined}
                required
            />

            <Input
                id="alias"
                label="alias"
                value={data.alias}
                className="mb-2"

                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { 
                    setData({ ...data, alias: e.target.value }) }}
                error={errors?.name || undefined}
                required
            />
        </FormWrapper>
    );
}
