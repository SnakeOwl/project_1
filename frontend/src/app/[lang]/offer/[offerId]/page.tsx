import { getDictionary } from "@/utils/get-dictionary";
import { Locale } from "@/i18n-config";
import axiosClient from "@/axios-client";
import IOffer from "@/interfaces/IOffer";
import ILinkToOffer from "./_Conmponents/ILinkToOffer";
import Galery from "./_Conmponents/Galery";
import ToBusketButton from "@/_Components/Buttons/ToBusketButton";
import SubscribeArea from "@/app/[lang]/_Components/SubscribeArea";
import LinksToTheOtherOffers from "./_Conmponents/LinksToTheOtherOffers";


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



export default async function OfferPage({
    params: {
        offerId,
        lang
    }
}: {
    params: {
        offerId: string,
        lang: Locale
    }
}) {

    const dict = await getDictionary(lang);
    const [offer, linksToOffers] = await getOffer(offerId);

    if(offer.item == undefined)
        throw new Error("Error. Can't find Item for Offer");


    return (
        <main className="w-full mx-auto xl:w-3/4">
            {/* top of page */}
            <div className="flex flex-wrap">
                <div className="w-full xl:w-1/2 mb-4"></div>

                <div className="w-full xl:w-1/2">
                    <h1>
                        {`${dict["buy"]} ` + (dict["cl"] === "ru" ? offer.item.name : offer.item.name_en)}
                    </h1>

                    {linksToOffers !== undefined &&
                        <LinksToTheOtherOffers
                            dict={dict}
                            linksToOffers={linksToOffers}
                            offerOptions={offer.options? offer.options: [] }
                        />

                    }

                    <p className="text-xl">{`${dict["price"]}: ${offer.price}`}</p>


                    {offer.count > 0 ?
                        <div className="w-full mt-3 flex">
                            <ToBusketButton
                                offerID={offer.id}
                                className={"py-3 rounded-md text-xl mx-auto w-full xl:w-1/4"}
                            >
                                {dict["to basket"]}
                            </ToBusketButton>
                        </div>
                        :

                        <div className="w-full xl:w-1/2 mx-auto">
                            <SubscribeArea dict={dict} offerID={offer.id} />
                        </div>
                    }
                </div>
            </div>


            {/* Galery */}
            {offer.images !== undefined && offer.images.length > 0 &&
                <div className="w-full my-8">
                    <h2 className="text-center my-3">{dict["galery"]}</h2>
                    <Galery images={offer.images} />
                </div>
            }


            {/* Description */}
            <div className="my-8 w-full">
                <h2 className="text-center">{dict["description"]}</h2>
                <p>{dict["currentLocale"] === "ru" ? offer.item.description : offer.item.description_en}</p>
            </div>


            {/* Parameters of Item */}
            <div className="w-full my-8">
                <h2 className="text-center">{dict["parameters"]}</h2>
                <div className="overflow-auto">

                    <table className="w-full">
                        <tbody>
                            {offer.item.parameters?.map(parameter => {
                                    return (
                                        <tr key={parameter.id}>
                                            <td>
                                                {dict["cl"] === "ru" ? parameter.param_name : parameter.param_name_en}
                                            </td>
                                            <td>
                                                {dict["cl"] === "ru" ? parameter.param_value : parameter.param_value_en}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>


            {offer.count > 0 ?
                <div className="w-full mt-3 flex">
                    <ToBusketButton
                        offerID={offer.id}
                        className={"py-3 rounded-md text-xl mx-auto w-full xl:w-1/4"}
                    >
                        {dict["to basket"]}
                    </ToBusketButton>
                </div>
                :
                <div className="w-full flex justify-center">
                    <div className="w-full xl:w-1/4 ">
                        <SubscribeArea dict={dict} offerID={offer.id} />
                    </div>
                </div>
            }
        </main>
    )
}



// metadata. server only!
export async function generateMetadata({
    params: {lang, offerId}
}: {
    params: {
        lang: Locale,
        offerId: string,
    }
}) {
    const dict = await getDictionary(lang)
    const [offer] = await getOffer(offerId)

    return {
        openGraph:{
            title: `${dict["buy"]} ${offer.item?.name}`,
            images: [offer.short_image] ,
            url: 'https://nextjs.org'
        },
        
        title: `${dict["buy"]} ${offer.item?.name}`,
    }
}