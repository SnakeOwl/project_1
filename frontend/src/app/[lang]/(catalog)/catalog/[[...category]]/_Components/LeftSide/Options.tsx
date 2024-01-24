import Preloader from "@/_Components/Preloader";
import { useContext, useEffect, useState } from "react"
import IShape from "@/interfaces/IShape";
import Checkbox from "@/_Components/Inputs/Checkbox";
import { useRouter, useSearchParams } from 'next/navigation'
import ICategory from "@/interfaces/ICategory";
import ContextCatalog from "@/context/Catalog/ContextCatalog";


export default function Options({
    category,
    dict
}: {
    category: ICategory
    dict: any
}) {
    const { stateCatalog } = useContext(ContextCatalog);
    const { activeOptions } = stateCatalog;

    // список всех Шейпов от текущей Категории
    const [shapes, setShapes] = useState<IShape[]>(activeOptions);

    // выбранные опции, для фильтра. Будут храниться Идишники
    const [foptions, setFoptions] = useState<string[]>([]);

    const searchParams = useSearchParams();
    const router = useRouter();


    useEffect(() => {
        // обновление активной категоии и её опций
        (async ()=>{
            // парсинг приходящих параметров из url
            const searchOptions = searchParams.get('options')?.split(',');
            setFoptions(() => searchOptions || []);
            setShapes(() => stateCatalog.activeOptions)
        })();

        
    }, [category, searchParams, stateCatalog]);


    if (shapes.length === 0)
        return <Preloader />



    function optionChanged(e: React.ChangeEvent<HTMLInputElement>) {
        const id = e.target.value;
        let temp = foptions;

        if (temp.includes(id)) {
            delete temp[temp.indexOf(id)];
        } else {
            temp.push(id);
        }

        // чистка пустых ячеек
        temp = temp.filter(el => el != null);

        // todo: При реализации других фильтров, нужно обдумать о синхронизации параметров url
        if (temp.length > 0){
            const searchParameters = "?options=" + temp.toString();
            router.push(searchParameters)
        } else {
            // если не запушить с изменением пути, то оно компонент не перерисует
            router.push("?");
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
                                        label={dict["cl"] === "ru" ? option.value : option.value_en}
                                        checked={foptions.includes(String(option.id))}
                                        onChange={optionChanged}
                                        value={option.id}
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