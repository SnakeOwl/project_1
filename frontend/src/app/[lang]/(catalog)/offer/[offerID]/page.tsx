import "server-only"
import { getDictionary } from "@/utils/get-dictionary";
import { Locale } from "@/i18n-config";
import IOffer from "@/interfaces/IOffer";
import ILinkToOffer from "./_Conmponents/ILinkToOffer";
import OfferView from "./_Conmponents/OfferView";
import fetchClient from "@/fetch-client";
import { notFound } from "next/navigation";



async function getOffer(offerId: string): Promise<[IOffer, ILinkToOffer[]]> {
    let offer = undefined; // текущее ТП
    let linksToOffers = undefined; // ссылки на другие ТП, текущего товара

    const response = await fetchClient.get(`catalog/${offerId}`)
    switch (response.status) {
        case 200:
            const { jsonData } = response;
            offer = jsonData.offer;
            linksToOffers = Object.values<ILinkToOffer>(jsonData.itemOffersLinks);
            break;
            
        case 404:
            notFound();
    }

    if (offer === undefined || linksToOffers === undefined)
        throw new Error("Can't get offer information");

    return [offer, linksToOffers];
}




interface IProps {
    params: {
        offerID: string
        lang: Locale
    }
}


export default async function OfferPage({
    params: {
        offerID,
        lang
    }
}: IProps) {
    const [offer, linksToOffers] = await getOffer(offerID);
    const dict = await getDictionary(lang);

    if (offer.item == undefined)
        throw new Error("Error. Can't find Item for Offer");


    return (
        <main className="w-full mx-auto xl:w-3/4 px-2">
            <OfferView
                offer={offer}
                linksToOffers={linksToOffers}
                dict={dict}
            />
        </main>
    )
}



// намеренный отказ от Full Route Cache, из-за того что количество предложений для покупок ограничено
// а оно кешит на хуеву тучу секунд

// returns { offerID: string }[]  OR  []
// export async function generateStaticParams() {
//     const response = await fetchClient.get("get/offers/all-ids")
    
//     switch (response.status) {
//         case 200:
//             const { jsonData } = response;
//             return jsonData.map<any[]>((off: {id: string}) => { return { offerID: off.id.toString() } });
            
//             break;
//     }
// }






// metadata. server only!
export async function generateMetadata({
    params: { lang, offerID }
}: IProps) {
    const dict = await getDictionary(lang)
    const [offer] = await getOffer(offerID)

    return {
        title: `${dict["buy"]} ${offer.item?.name}`,
    }
}