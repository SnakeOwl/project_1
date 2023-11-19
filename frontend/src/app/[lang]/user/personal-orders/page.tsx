import "server-only"
import { getDictionary } from "@/utils/get-dictionary";
import { Locale } from "@/i18n-config";
import OrdersList from "./Components/OrdersList";


export default async function PersonalOrders({
    params: {lang}
}: {
    params: {lang: Locale}
}) {

    const dict = await getDictionary(lang);


    return (
        <main>
            <h1 className="text-center">
                {dict["orders"]}
            </h1>

            <OrdersList dict={dict} />
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
        title: dict["personal orders"],
    }
}