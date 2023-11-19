import { Locale } from "@/i18n-config";
import { getDictionary } from "@/utils/get-dictionary";
import "server-only"
import DataForm from "./Components/DataForm";


export default async function PersonalDataPage({
    params: { lang }
}: {
    params: { lang: Locale }
}) {

    const dictionary = await getDictionary(lang);

    return (
        <div>
            <h1 className="text-center">{dictionary["personal data"]}</h1>

            <DataForm dictionary={dictionary} />
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
        title: dict["personal data"],
    }
}
