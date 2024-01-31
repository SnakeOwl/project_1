import { Locale } from "@/i18n-config";
import { getDictionary } from "@/utils/get-dictionary";
import "server-only";
import Form from "./Components/Form";
import getCategories from "@/utils/getCategories";
import getItem from "@/utils/getItem";


export default async function ItemFormPage({
    params: {lang, itemID}
}:{
    params: {
        lang: Locale,
        itemID: string| undefined
    }
}){
    const dict = await getDictionary(lang);
    const categories = await getCategories();

    const item = itemID
        ? await getItem(itemID, {cache: "no-store"})
        : undefined;


    return (
        <main>
            <h1 className="text-center">
                {dict["item management form"]} {itemID && `# ${itemID}`}
            </h1>
            
            <Form 
                dict={dict} 
                item={item} 
                categories={categories}
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
        title: dict["item management form"],
    }
}