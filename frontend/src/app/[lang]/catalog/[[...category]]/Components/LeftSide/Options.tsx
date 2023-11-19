import Preloader from "@/Components/Preloader";
import axiosClient from "@/axios-client";
import ContextCatalog from "@/context/Catalog/ContextCatalog";
import { useContext, useEffect, useState } from "react"
import IShape from "@/interfaces/IShape";
import Checkbox from "@/Components/Inputs/Checkbox";
import IOption from "@/interfaces/IOption";

export default function Options({
    categoryId,
    dictionary
}: {
    categoryId: number
    dictionary: any
}) {
    const { dispatchCatalog } = useContext(ContextCatalog);

    // список всех Шейпов от текущей Категории
    const [shapes, setShapes] = useState<IShape[]>([]);

    // выбранные опции, для фильтра. Будут храниться Идишники
    const [foptions, setFoptions] = useState<number[]>([]);


    async function updateOffersAndShapes() {
        await axiosClient.get(`catalog/category/${categoryId}/options`, {
            params: { options: foptions }
        })
            .then(({ data }: {
                data: {
                    options: IShape[],
                    offers: {}
                }
            }) => {
                setShapes(data.options);

                dispatchCatalog({
                    type: "SET_OFFERS",
                    offers: data.offers
                });
            })
            .catch(error => {
                console.log(error);
            })
    }


    //нужно для получения Шейпов Категории
    useEffect(() => {
        updateOffersAndShapes();
    }, [categoryId]);


    if (shapes.length === 0)
        return <Preloader />



    function optionChanged(e: React.ChangeEvent<HTMLInputElement>) {
        const id = Number(e.target.id);
        let temp = foptions;

        if (temp.includes(id)) {
            delete temp[temp.indexOf(id)];
        } else {
            temp.push(id);
        }

        // чистка пустых ячеек
        temp = temp.filter(el => el != null);

        setFoptions(temp);

        updateOffersAndShapes();
    }

    return (
        <>
            {
                shapes.map(shape => {
                    return (

                        <div key={`${shape.name}`} className="mb-4">

                            <span>{dictionary["cl"] === "ru" ? shape.name : shape.name_en}</span>
                            {
                                shape.options.map(option => {
                                    return (

                                        <div className="relative py-1 mb-1" key={`option-${option.id}`}>
                                            {option.count > 0 ?
                                                <>
                                                    <Checkbox
                                                        id={`${option.id}`}
                                                        label={dictionary["cl"] === "ru" ? option.value : option.value_en}
                                                        checked={foptions.includes(option.id)}
                                                        className=""
                                                        onChange={optionChanged}
                                                    />
                                                    <div className="absolute right-0 top-0 text-sm text-white px-1 bg-blue-500 rounded-md">
                                                        {option.count}
                                                    </div>
                                                </>
                                                :
                                                <span className="text-gray-500">
                                                    {dictionary["cl"] === "ru" ? option.value : option.value_en}
                                                </span>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>

                    )
                })
            }
        </>
    )
}