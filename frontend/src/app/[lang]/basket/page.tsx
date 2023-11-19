import "server-only"
import CardsList from "./Components/CardsList";
import { RedLink } from "@/Components/Links/ColoredLinks";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/utils/get-dictionary";


export default async function BasketPage({
    params: {lang}
}:{
    params:{
        lang:Locale
    }
}) {

    const dictionary = await getDictionary(lang);

    
    return (
        <div className="w-full xl:w-3/4 mx-auto">
            <h1 className="text-center mb-4">{dictionary["basket"]}</h1>

            <CardsList />

            <div className="w-full xl:w-1/5 mx-auto text-center mt-8 ">
                <RedLink className="w-full py-2" href="/basket/checkout">{dictionary["checkout"]}</RedLink>
            </div>
        </div>
    )
}



// metadata. server only!
export async function generateMetadata({
    params: { lang },
}: {
    params: { lang: Locale }
}) {
    const dict = await getDictionary(lang)

    return {
        title: dict["basket"],
    }
}