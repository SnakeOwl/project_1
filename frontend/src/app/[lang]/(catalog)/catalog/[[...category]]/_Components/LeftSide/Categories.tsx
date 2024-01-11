"use client"

import { BlueLinkReversed } from "@/_Components/ColoredLinks";
import ContextCatalog from "@/context/Catalog/ContextCatalog";
import { useContext, useEffect, useState } from "react";
import Options from "./Options";
import { BlueButton } from "@/_Components/Buttons/ColoredButtons";
import ICategory from "@/interfaces/ICategory";
import getCategories from "@/utils/getCategories";
import CategoryLoader from "./CategoryLoader";


export default function Categories({ dict}: { dict: any }) {

    const { stateCatalog } = useContext(ContextCatalog)
    const { activeCategoryAlias } = stateCatalog;

    const [categories, setCategories] = useState<ICategory[]>();

    useEffect(() => {
        const updateCategories = async () =>{
            const categories = await getCategories();
            setCategories(categories);
        }
        updateCategories();
    }, [activeCategoryAlias])

    


    if (categories === undefined)
        return <CategoryLoader />
        

    return (
        <div className={"flex flex-col"}>
            {categories.map((category) => {
                return (activeCategoryAlias === category.alias) ?
                    <div key={category.id} >
                        <BlueButton className={"py-2 text-center mb-3 w-full"} >
                            {dict["cl"] === "ru" ? category.name : category.name_en}
                        </BlueButton>

                        <Options
                            dict={dict}
                            categoryId={category.id}
                        />
                    </div>
                    :
                    <BlueLinkReversed
                        key={category.id}
                        href={`/catalog/${category.alias}`}
                        className={"py-2 text-center mb-3 rounded"}
                    >
                        {dict["cl"] === "ru" ? category.name : category.name_en}
                    </BlueLinkReversed>
            })}
        </div>
    );
}
