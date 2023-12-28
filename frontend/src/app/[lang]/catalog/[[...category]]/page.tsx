import "server-only"
import { Locale } from "@/i18n-config";
import OfferList from "./_Components/OffersList";
import { getDictionary } from "@/utils/get-dictionary";
import getCategories from "@/utils/getCategories";


interface IProps {
    params: {
        lang: Locale
        category?: string[]
    }
}


export default async function CatalogPage({
    params:{ category, lang }
}: IProps ) {
    
    const dict = await getDictionary(lang)
    const categories = await getCategories();

    return (
        <div>
            <OfferList dict={dict} category={category}  />
        </div>
    );
}


// metadata. server only!
export async function generateMetadata({
    params: { lang },
}: IProps ) {
    const dict = await getDictionary(lang)

    return {
        title: dict["catalog"],
    }
}