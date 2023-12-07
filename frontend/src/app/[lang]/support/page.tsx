import { getDictionary } from "@/utils/get-dictionary"
import SupportForm from "./_Сomponents/SupportForm"
import { Locale } from "@/i18n-config"


export default async function SupportPage({
    params: { lang },
}: {
    params: { lang: Locale }
}) {

    const dictionary = await getDictionary(lang)

    return (
        <>
            <main className="mx-auto text-center xl:w-1/4">
                <h1>{dictionary['contact form']}</h1>

                <SupportForm
                    dictionary={dictionary}
                />
            </main>
        </>
    )
}


// metadata
export async function generateMetadata({
    params: { lang },
}: {
    params: { lang: Locale }
}) {
    const dict = await getDictionary(lang)

    return {
        title: dict["support"],
    }
}