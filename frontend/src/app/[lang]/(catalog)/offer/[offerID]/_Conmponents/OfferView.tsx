import IOffer from "@/interfaces/IOffer";
import LinksToTheOtherOffers from "./LinksToTheOtherOffers";
import ToBusketButton from "@/_Components/Buttons/ToBusketButton";
import ILinkToOffer from "./ILinkToOffer";
import Img from "@/_Components/Img";
import Galery from "./Galery";
import SubscribeModule from "@/app/[lang]/_Components/SubscribeModule";


export default function OfferView({
    offer, dict, linksToOffers
}: {
    offer: IOffer
    dict: any
    linksToOffers: ILinkToOffer[]
}) {

    return (
        <>
            {/* top of page */}
            <div className="flex flex-wrap">
                <div className="w-full xl:w-1/2 mb-4 px-4">
                    <Img src={offer.short_image} className="w-full" />
                </div>

                <div className="w-full xl:w-1/2">
                    <h1>
                        {`${dict["buy"]} ` + (dict["cl"] === "ru" ? offer.item?.name : offer.item?.name_en)}
                    </h1>

                    {linksToOffers !== undefined &&
                        <LinksToTheOtherOffers
                            dict={dict}
                            linksToOffers={linksToOffers}
                            offerOptions={offer.options ? offer.options : []}
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

                        <div className="w-full 2xl:w-1/3 mx-auto">
                            <SubscribeModule dict={dict} offerID={offer.id} />
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
                <p>{dict["currentLocale"] === "ru" ? offer.item?.description : offer.item?.description_en}</p>
            </div>


            {/* Parameters of Item */}
            <div className="w-full my-8">
                <h2 className="text-center">{dict["parameters"]}</h2>
                <div className="overflow-auto">

                    <table className="w-full">
                        <tbody>
                            {offer.item?.parameters?.map(parameter =>
                                <tr key={parameter.id}>
                                    <td>
                                        {dict["cl"] === "ru" ? parameter.param_name : parameter.param_name_en}
                                    </td>
                                    <td>
                                        {dict["cl"] === "ru" ? parameter.param_value : parameter.param_value_en}
                                    </td>
                                </tr>
                            )
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
                    <div className="w-full 2xl:w-1/5 ">
                        <SubscribeModule dict={dict} offerID={offer.id} />
                    </div>
                </div>
            }
        </>
    )
}