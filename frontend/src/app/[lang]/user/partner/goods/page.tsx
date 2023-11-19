import { Locale } from "@/i18n-config"
import { getDictionary } from "@/utils/get-dictionary"
import "server-only"
import CardList from "./Components/CardList"


interface IProps {
    params: {lang: Locale}
}


export default async function PartnerGoodsPage({
    params: { lang }
}: IProps){
    const dict = await getDictionary(lang)

    return (
        <main>
            <h1>{dict["goods management"]}</h1>

            <CardList dict={dict} />
        </main>
    );
}





export async function generateMetadata({
    params: { lang },
}: IProps) {
    const dict = await getDictionary(lang);

    return {
        title: dict["goods"],
    }
}