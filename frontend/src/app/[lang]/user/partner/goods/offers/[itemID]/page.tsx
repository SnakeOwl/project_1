import { Locale } from "@/i18n-config"
import { getDictionary } from "@/utils/get-dictionary"
import "server-only"
import OfferList from "./Components/OfferList";
import IOffer from "@/interfaces/IOffer";
import getOffersByItem from "@/utils/getOffersByItem";
import PageRefresher from "@/app/[lang]/user/_Components/PageRefresher";


export  default async function PartnerOffersPage({params: {
    lang, itemID
}}: {
    params: {
        lang: Locale
        itemID: string
    }
} ){
    const dict = await getDictionary(lang);

    const offers:IOffer[] = await getOffersByItem(itemID, {cache: "no-store"});

    return (
        <main>
            <h1>{dict["offers"] + `(#${itemID})`}</h1>
            
            <OfferList 
                dict={dict}
                offers={offers} 
                itemID={itemID} 
            />

            <PageRefresher />
        </main>
    )
}