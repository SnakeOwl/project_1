import ActiveOrdersList from "./_Components/ActiveOrdersList";
import { getDictionary } from "@/utils/get-dictionary";
import { Locale } from "@/i18n-config";


export default async function PersonalPage(props: {
    params: {lang: Locale}
}) {

    const dict = await getDictionary(props.params.lang);

    return (
        <main>
            <h1 className="text-center">
                {dict["active orders"]}
            </h1>

            <ActiveOrdersList dict={dict} />
        </main>
    )
}


// metadata. server only!
export async function generateMetadata(props: {
    params: {lang: Locale}
}) {
    const dict = await getDictionary(props.params.lang);

    return {
        title: dict["personal page"],
    }
}