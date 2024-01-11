import axiosClient from "@/axios-client";
import { Locale } from "@/i18n-config"
import { getDictionary } from "@/utils/get-dictionary"
import "server-only"
import OfferForm from "./Components/OfferForm";
import ICategory from "@/interfaces/ICategory";


async function  getCategoryOptions(itemID: string): Promise<ICategory> {
    let result = undefined;

    await axiosClient.get(`get/options-by-item/${itemID}`)
        .then(({data})=>{
            result = data;
        })
        .catch(()=>{
            throw new Error("Error. Can't get category options from server.");
        });

        if (result == undefined)
            throw new Error("Error. No category options.");
    
    return result;
}


async function getOffer(itemID: string, offerID: string){
    let result = undefined;

    await axiosClient.get(`get/items/${itemID}/offers/${offerID}/edit`)
        .then(({data})=>{
            result = data;
        })
        .catch(()=>{
            throw new Error("Error. Can't get category options from server.");
        });

        if (result == undefined)
            throw new Error("Error. No category options.");
    
    return result;
}


interface IProps {
    params: {
        lang: Locale
        itemID: string
        offerID?: string
    }
}


export default async function OfferFormPage({
    params: { lang, itemID, offerID }
}: IProps ){
    const dict = await getDictionary(lang);
    const category: ICategory = await getCategoryOptions(itemID);

    const offer = offerID !== undefined? await getOffer(itemID, offerID): undefined;


    return (
        <main>
            <h1>{dict["offer form h"]}</h1>

            <OfferForm 
                dict={dict}
                category={category}
                itemID={itemID}
                offer={offer}
            />
        </main>
    )
}



// metadata. server only!
export async function generateMetadata({
    params: { lang },
}: IProps) {
    const dict = await getDictionary(lang);

    return {
        title: dict["offer form h"]
    }
}