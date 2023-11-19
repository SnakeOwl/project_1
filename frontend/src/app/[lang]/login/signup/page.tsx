import { Locale } from "@/i18n-config"
import { getDictionary } from "@/utils/get-dictionary"
import "server-only"
import SighupForm from "./Components/SighupForm"


export default async function SighupPage({
    params: { lang }
}: {
    params: { lang: Locale }
}) {
    const dictionary = await getDictionary(lang)

    return (
        <main className="xl:w-1/4 mx-auto">
            <h1 className="text-center">{dictionary["sighup"]}</h1>

            <SighupForm dictionary={dictionary} />
        </main>
    )
}



// metadata. server only!
export async function generateMetadata({
    params: { lang},
}: {
    params: {
        lang: Locale,
    }
}) {
    const dict = await getDictionary(lang)

    return {
        title: dict["sighup"]    
    }
}

