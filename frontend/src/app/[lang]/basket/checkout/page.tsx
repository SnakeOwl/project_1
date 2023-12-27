import "server-only"

import { Locale } from "@/i18n-config";
import { getDictionary } from "@/utils/get-dictionary";
import CheckoutForm from "./_Components/CheckoutForm";



export default async function CheckoutPage({
    params: {lang}
}: {
    params: {lang: Locale}
}) {
    const dictionary = await getDictionary(lang);


    return (
        <main className="w-full xl:w-1/3 mx-auto">
            <h1 className="text-center">{dictionary["checkout"]}</h1>
            <CheckoutForm dictionary={dictionary}/>
        </main>
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
        title: dict["checkout"],
    }
}