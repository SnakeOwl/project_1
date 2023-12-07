import ActiveOrdersList from "./_Components/ActiveOrdersList";
import { getDictionary } from "@/utils/get-dictionary";
import { Locale } from "@/i18n-config";


export default async function PersonalPage({
    params
}: {
    params: {
        lang: Locale
    }
}) {

    const dictionary = await getDictionary(params.lang);

    return (
        <main>
            <h1 className="text-center">
                {dictionary["active orders"]}
            </h1>

            <ActiveOrdersList dictionary={dictionary} />
        </main>
    )
}


// metadata. server only!
export async function generateMetadata({
    params: { lang },
}: {
    params: { lang: Locale }
}) {
    const dict = await getDictionary(lang);

    return {
        title: dict["personal page"],
    }
}