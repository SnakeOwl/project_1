"use client"

import StateCatalog from "@/context/Catalog/StateCatalog";
import LeftSide from "./_Components/LeftSide";
import getDictionaryStatic from "@/utils/get-dictionary-static";
import { Locale } from "@/i18n-config";
import { useReducer } from "react";
import ReducerCatalog from "@/context/Catalog/ReducerCatalog";
import ContextCatalog from "@/context/Catalog/ContextCatalog";
import MobileMenuArea from "@/_Components/menu/MobileMenuArea";

export default function Layout({
    params,
    children
}: {
    children: React.ReactNode,
    params: {
        category: [string | undefined],
        lang: Locale
    }
}) {

    const dictionary = getDictionaryStatic(params.lang);


    // определение названия категории, которая приходит через строку браузера
    const activeCategoryAlias = params.category !== undefined ? params.category[0] : null;


    // переменная для передачи state в reducer
    const newStateCatalog = {
        ...StateCatalog,
        activeCategoryAlias: activeCategoryAlias
    };

    const [stateCatalog, dispatchCatalog] = useReducer(ReducerCatalog, newStateCatalog);


    return (
        <div className="flex">
            <ContextCatalog.Provider value={{ stateCatalog, dispatchCatalog }}>

                <MobileMenuArea>
                    <LeftSide dictionary={dictionary} />
                </MobileMenuArea>

                <main className="w-full xl:w-5/6">
                    {children}
                </main>

            </ContextCatalog.Provider >
        </div>
    )

}