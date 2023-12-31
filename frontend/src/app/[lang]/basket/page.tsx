import "server-only"
import CardsList from "./_Components/CardsList";
import { RedLink } from "@/_Components/ColoredLinks";
import { Locale } from "@/i18n-config";
import { getDictionary } from "@/utils/get-dictionary";


export default async function BasketPage({
    params: { lang }
}: {
    params: { lang:Locale }
} ) {

    const dict = await getDictionary(lang);
    
    return (
        <div className="w-full xl:w-3/4 mx-auto">
            <h1 className="text-center mb-4">{dict["basket"]}</h1>

            <CardsList dict={dict} />

            <div className="w-full xl:w-1/5 mx-auto text-center mt-8 ">
                <RedLink className="w-full py-2" href="/basket/checkout">{dict["checkout"]}</RedLink>
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