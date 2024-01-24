import "server-only"
import { getDictionary } from "@/utils/get-dictionary";
import { Locale } from "@/i18n-config";
import IOffer from "@/interfaces/IOffer";
import ILinkToOffer from "./_Conmponents/ILinkToOffer";
import OfferView from "./_Conmponents/OfferView";
import fetchClient from "@/fetch-client";



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
    const dict = await getDictionary(lang);
    const [offer, linksToOffers] = await getOffer(offerID);

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



// returns { offerID: string }[]  OR  []
export async function generateStaticParams() {
    const response = await fetchClient.get("get/offers/all-ids")

    switch (response.status) {
        case 200:
            const { jsonData } = response;
            const result = jsonData.map((off: {id: string}) => { return { offerID: off.id.toString() } });
            return result;
            break;
    }

    return [];
}


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