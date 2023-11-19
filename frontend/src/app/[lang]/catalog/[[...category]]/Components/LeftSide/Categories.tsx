"use client"

import { BlueLinkReversed } from "@/Components/Links/ColoredLinks";
import axiosClient from "@/axios-client";
import ContextCatalog from "@/context/Catalog/ContextCatalog";
import { useContext, useEffect, useState } from "react";
import Options from "./Options";
import { BlueButton } from "@/Components/Buttons/ColoredButtons";
import ICategory from "@/interfaces/ICategory";
import Preloader from "@/Components/Preloader";

export default function Categories({
    dictionary
}: {
    dictionary: any
}) {

    const { stateCatalog } = useContext(ContextCatalog)
    const { activeCategoryAlias } = stateCatalog;
    
    const [categories, setCategories] = useState<ICategory[]>();

    useEffect(() => {
        axiosClient.get("catalog/get-categories")
            .then(({ data }) => {
                setCategories(data.categories);
            })
    }, [activeCategoryAlias])


    if (categories === undefined)
        return <Preloader />

    return (
        <div className={"flex flex-col"}>
            {categories.map((category) => {
                return (activeCategoryAlias === category.alias) ?
                    <div key={category.id} >
                        <BlueButton className={"py-2 text-center mb-3 w-full"} >
                            {category.name}
                        </BlueButton>

                        <Options 
                            dictionary={dictionary}
                            categoryId={category.id} 
                            />
                    </div>
                    :
                    <BlueLinkReversed
                        key={category.id}
                        href={`/catalog/${category.alias}`}
                        className={"py-2 text-center mb-3 rounded"}
                    >
                        {category.name}
                    </BlueLinkReversed>
            })}
        </div>
    );
}
