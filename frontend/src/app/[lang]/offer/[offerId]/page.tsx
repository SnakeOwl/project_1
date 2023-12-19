import { getDictionary } from "@/utils/get-dictionary";
import { Locale } from "@/i18n-config";
import axiosClient from "@/axios-client";
import IOffer from "@/interfaces/IOffer";
import ILinkToOffer from "./_Conmponents/ILinkToOffer";
import OfferView from "../../_Components/catalog/OfferView";


// getting data from API
async function getOffer(offerId: string): Promise<[IOffer, ILinkToOffer[]]> {

    let offer = undefined; // текущее ТП
    let linksToOffers = undefined; // ссылки на другие ТП, текущего товара

    await axiosClient.get(`catalog/${offerId}`)
        .then(({ data }) => {
            offer = data.offer;
            linksToOffers = Object.values(data.itemOffersLinks);
        })


    if (offer === undefined || linksToOffers === undefined)
        throw new Error("Can't get offer information");


    return [offer, linksToOffers];
}


interface IProps {
    params: {
        offerId: string
        lang: Locale
    }
}


export default async function OfferPage({
    params: {
        offerId,
        lang
    }
}: IProps) {
    const dict = await getDictionary(lang);
    const [offer, linksToOffers] = await getOffer(offerId);

    if (offer.item == undefined)
        throw new Error("Error. Can't find Item for Offer");


    return (
        <main className="w-full mx-auto xl:w-3/4">
            <OfferView
                offer={offer}
                linksToOffers={linksToOffers}
                dict={dict}
            />
        </main>
    )
}



// metadata. server only!
    export async function generateMetadata({
        params: { lang, offerId }
    }: IProps) {
    const dict = await getDictionary(lang)
    const [offer] = await getOffer(offerId)

    return {
        title: `${dict["buy"]} ${offer.item?.name}`,
    }
}