import axiosClient from "@/axios-client"
import { Locale } from "@/i18n-config"
import { getDictionary } from "@/utils/get-dictionary"
import "server-only"
import OfferList from "./Components/OfferList";
import IOffer from "@/interfaces/IOffer";


async function getOffers(itemID: string){
    let result = undefined;

    await axiosClient.get(`get/items/${itemID}/offers`)
        .then(response=>{
            const {data} = response;

            result = data;
        })
        .catch(error => {
            throw new Error("Error! Can't get Item from server.");
        });

    if (result == undefined)
        throw new Error("Error! Can't get Item from server.");    

    return result;
}


interface IProps {
    params: {
        lang: Locale
        itemID: string
    }
}


export  default async function PartnerOffersPage({params: {
    lang, itemID
}}: IProps ){
    const dict = await getDictionary(lang);

    const offers:IOffer[] = await getOffers(itemID);

    return (
        <main>
            <h1>{dict["offers"] + `(#${itemID})`}</h1>
            
            <OfferList 
                dict={dict}
                offers={offers} 
                itemID={itemID} 
            />
        </main>
    )
}