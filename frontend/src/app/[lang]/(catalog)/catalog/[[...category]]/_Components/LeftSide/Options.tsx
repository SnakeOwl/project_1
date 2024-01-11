import Preloader from "@/_Components/Preloader";
import axiosClient from "@/axios-client";
import ContextCatalog from "@/context/Catalog/ContextCatalog";
import { useContext, useEffect, useState } from "react"
import IShape from "@/interfaces/IShape";
import Checkbox from "@/_Components/Inputs/Checkbox";
import { useRouter, useSearchParams } from 'next/navigation'


export default function Options({
    categoryId,
    dict
}: {
    categoryId: string
    dict: any
}) {
    const { dispatchCatalog } = useContext(ContextCatalog);

    // список всех Шейпов от текущей Категории
    const [shapes, setShapes] = useState<IShape[]>([]);


    // выбранные опции, для фильтра. Будут храниться Идишники
    const [foptions, setFoptions] = useState<string[]>([]);

    const router = useRouter();
    const searchParams = useSearchParams();

    async function updateOffersAndShapes() {
        console.log("updating offers and shapes")
        // парсинг приходящих параметров из url
        const searchOptions = searchParams.get('options')?.split(',');
        setFoptions(searchOptions || []);

        await axiosClient.get(`catalog/category/${categoryId}/options`, {
            params: { options: searchOptions }
            // params: { options: foptions }  // старый подход, через стайт
        })
            .then(({ data }) => {
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
    }, [categoryId, searchParams]);


    if (shapes.length === 0)
        return <Preloader />



    function optionChanged(e: React.ChangeEvent<HTMLInputElement>) {

        const id = e.target.id;
        let temp = foptions;

        if (temp.includes(id)) {
            delete temp[temp.indexOf(id)];
        } else {
            temp.push(id);
        }

        // чистка пустых ячеек
        temp = temp.filter(el => el != null);

        if (temp.length > 0){
            const searchParameters = "?options=" + temp.toString();
            router.push(searchParameters)
        } else {
            // если не запушить с изменением пути, то оно компонент не перерисует
            router.push("?no-filter-options");
        }
    }

    return (
        <>
            {shapes.map(shape =>
                <div key={`${shape.name}`} className="mb-4">
                    <span>{dict["cl"] === "ru" ? shape.name : shape.name_en}</span>
                    {shape.shape_options?.map(option =>
                        <div className="relative py-1 mb-1" key={`option-${option.id}`}>
                            {option.count > 0 ?
                                <>
                                    <Checkbox
                                        id={option.id}
                                        label={dict["cl"] === "ru" ? option.value : option.value_en}
                                        checked={foptions.includes(String(option.id))}
                                        className=""
                                        onChange={optionChanged}
                                    />
                                    <div className="absolute right-0 top-0 text-sm text-white px-1 bg-blue-500 rounded-md">
                                        {option.count}
                                    </div>
                                </>
                                :
                                <span className="text-gray-500">
                                    {dict["cl"] === "ru" ? option.value : option.value_en}
                                </span>
                            }
                        </div>
                    )
                    }
                </div>
            )
            }
        </>
    )
}