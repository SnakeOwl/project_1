import { getDictionary } from "@/utils/get-dictionary";
import { Locale } from "@/i18n-config";
import OrderInformation from "./Components/OrderInformation";



// todo: какого-то хуя редиректит со страницы после перезагрузки
export default async function PersonalOrderPage({
    params: { orderId, lang }
}: {
    params: {
        lang: Locale,
        orderId: string
    }
}) {
    
    const dictionary = await getDictionary(lang);

    return (
        <main>
            <OrderInformation
                orderId={orderId}
                dictionary={dictionary}
            />
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
        title: dict["looking order"],
    }
}