"use client"
import { BlueButton } from "@/_Components/Buttons/ColoredButtons";
import { Input } from "@/_Components/Inputs/Input";
import Select from "@/_Components/Inputs/Select";
import Textarea from "@/_Components/Inputs/Textarea";
import { GreenText, RedText } from "@/_Components/text/borderedText";
import axiosClient from "@/axios-client";
import ICategory from "@/interfaces/ICategory";
import IItem from "@/interfaces/IItem"
import { useState } from "react";
import Parameters from "./Parameters";
import IParameter from "@/interfaces/IParameter";


type PostData = {
    name: string;
    name_en: string;
    category_id: string;
    description: string;
    description_en: string;

    parameters?: IParameter[]
}


interface IProps {
    dict: any
    item?: IItem
    categories: ICategory[]
}


export default function Form({
    dict,
    item,
    categories
}: IProps) {

    const [data, setData] = useState<PostData>(item || {
        name:   "",
        name_en: "",
        category_id: categories[0].id,
        description: "",
        description_en: "",

        parameters: []
    });

    function _setData(e: React.ChangeEvent<any>) {
        setData({
            ...data,
            [e.target.id]: e.target.value
        });
    };


    // данные для визуализации формы
    const [side, setSide] = useState({
        errors: {
            name: undefined,
            name_en: undefined,
            category_id: undefined,
            description: undefined,
            description_en: undefined
        },
        errMessage: undefined,
        success: false
    });


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        let request = undefined;
        if (item === undefined) {
            // creating new Item
            request = axiosClient.post("user/partner/items", data)
        } else {
            // updating Item
            request = axiosClient.patch(`user/partner/items/${item.id}`, data)
        }
        Promise.resolve(request)
            .then(({ status }) => {
                if (status === 204) {
                    setSide({ ...side, success: true });
                }
            })
            .catch(error => {
                // если нет респонса, значит нет ответа от сервера
                if (error.response === undefined) {
                    console.log(dict["server conn propblem"]);

                    return;
                }

                const { response } = error
                // ошибка валидации
                if (response.data.errors != undefined) {
                    setSide(s => {
                        return {
                            ...s,
                            errors: response.data.errors
                        }
                    });
                }

                // общие ошибки
                setSide(s => {
                    return {
                        ...s,
                        errMessage: response.data.message
                    }
                });
            })
    }


    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div className="2xl:w-2/3 mx-auto">

                    {side.errMessage !== undefined &&
                        <RedText className="mb-4">
                            {side.errMessage}
                        </RedText>
                    }

                    <Input
                        label={dict["name"]}
                        value={data.name}
                        id="name"
                        onChange={_setData}
                        error={side.errors.name}
                        className="mb-2"
                        disabled={item === undefined? false: true}
                        required
                    />

                    <Input
                        label={dict["item field name en"]}
                        value={data.name_en}
                        id="name_en"
                        onChange={_setData}
                        error={side.errors.name_en}
                        className="mb-4"
                        disabled={item === undefined? false: true}
                        required
                    />

                    <div className="mb-4">
                        <Select
                            id="category_id"
                            label={dict["item field category"]}
                            onChange={_setData}
                            options={categories}
                            lang={dict["cl"]}
                            selectedID={data.category_id}
                        />
                    </div>

                    <Textarea
                        label={dict["description"]}
                        value={data.description}
                        id="description"
                        onChange={_setData}
                        error={side.errors.description}
                        className="mb-2"
                    />

                    <Textarea
                        label={dict["item field description en"]}
                        id="description_en"
                        value={data.description_en}
                        onChange={_setData}
                        error={side.errors.description_en}
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

                {side.success === false ?
                    <BlueButton className="w-full py-2">
                        {dict["submit"]}
                    </BlueButton>
                    :
                    <GreenText className="text-center">
                        {dict["success"]}
                    </GreenText>
                }
            </form>
        </div>
    );
}