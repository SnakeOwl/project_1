import { Locale } from "@/i18n-config"
import { getDictionary } from "@/utils/get-dictionary"
import "server-only"
import CardList from "./_Components/CardList"
import PageRefresher from "../../_Components/PageRefresher"


export default async function PartnerGoodsPage({
    params: { lang }
}: {
    params: {lang: Locale}
}){
    const dict = await getDictionary(lang)

    return (
        <main>
            <h1>{dict["goods management"]}</h1>

            <CardList dict={dict} />

            <PageRefresher />
        </main>
    );
}





export async function generateMetadata({
    params: { lang },
}: {
    params: {lang: Locale}
}) {
    const dict = await getDictionary(lang);

    return {
        title: dict["goods"],
    }
}