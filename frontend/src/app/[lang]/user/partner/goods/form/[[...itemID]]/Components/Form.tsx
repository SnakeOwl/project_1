"use client"
import { Input } from "@/_Components/Inputs/Input";
import Select from "@/_Components/Inputs/Select";
import Textarea from "@/_Components/Inputs/Textarea";
import ICategory from "@/interfaces/ICategory";
import IItem from "@/interfaces/IItem"
import { useState } from "react";
import Parameters from "./Parameters";
import IParameter from "@/interfaces/IParameter";
import FormWrapper from "@/_Components/FormWrapper";


type PostData = {
    name: string;
    name_en: string;
    category_id: string;
    description: string;
    description_en: string;

    parameters?: IParameter[]
}


export default function Form({
    dict,
    item,
    categories
}: {
    dict: any
    item?: IItem
    categories: ICategory[]
}) {

    const [data, setData] = useState<PostData>(item || {
        name: "",
        name_en: "",
        category_id: categories[0].id,
        description: "",
        description_en: "",

        parameters: []
    });

    function _setData(e: React.ChangeEvent<any>, field: string) {
        setData({
            ...data,
            [field]: e.target.value
        });
    };


    const [errors, setErrors] = useState<any>();


    return (
        <FormWrapper
            data={data}
            createMode={item === undefined}
            createURL="user/partner/items"
            updateURL={`user/partner/items/${item?.id}`}
            setGeneralErrors={setErrors}
        >
            <div className="w-full 2xl:w-2/3 mx-auto">
                <Input
                    label={dict["name"]}
                    value={data.name}
                    onChange={e => _setData(e, "name")}
                    error={errors?.name || undefined}
                    className="mb-2"
                    disabled={item === undefined ? false : true}
                    required
                />

                <Input
                    label={dict["item field name en"]}
                    value={data.name_en}
                    onChange={e => _setData(e, "name_en")}
                    error={errors?.name_en || undefined}
                    className="mb-4"
                    disabled={item === undefined ? false : true}
                    required
                />

                <div className="mb-4">
                    <Select
                        id="category_id"
                        label={dict["item field category"]}
                        onChange={e => _setData(e, "category_id")}
                        options={categories}
                        lang={dict["cl"]}
                        selectedID={data.category_id}
                    />
                </div>

                <Textarea
                    label={dict["description"]}
                    value={data.description}
                    onChange={e => _setData(e, "description")}
                    error={errors?.description || undefined}
                    className="mb-2"
                />

                <Textarea
                    label={dict["item field description en"]}
                    value={data.description_en}
                    onChange={e => _setData(e, "description_en")}
                    error={errors?.description_en || undefined}
                    className="mb-2"
                />
            </div>

            <div className="mb-4">
                <h2>{dict["parameters"]}</h2>
                <Parameters
                    parameters={data.parameters || []}
                    setParameters={(params: IParameter[]) => { setData({ ...data, parameters: params }) }}
                    dict={dict}
                />
            </div>
        </FormWrapper>
    );
}