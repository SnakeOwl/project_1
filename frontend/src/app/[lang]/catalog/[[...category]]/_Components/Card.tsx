import { RedButtonReversed } from "@/_Components/Buttons/ColoredButtons"
import Img from "@/_Components/Img"
import Link from "next/link"
import ToBusketButton from "@/_Components/Buttons/ToBusketButton"
import IOffer from "@/interfaces/IOffer"
import { BlueLink, RedLinkReversed } from "@/_Components/Links/ColoredLinks"
import CardWrapper from "@/_Components/CardWrapper"


export default function Card({
    dict,
    offer
}: {
    dict: any
    offer: IOffer
}) {

    const offerLink = `/offer/${offer.id}`;

    return (
        <CardWrapper className="2xl:w-1/6 pb-4">
            <div className="h-64 rounded-md overflow-hidden mb-2">
                <Link href={offerLink} className="h-full w-full" >
                    <Img
                        className=" h-full w-full object-cover"
                        src={offer.short_image}
                    />
                </Link>
            </div>


            <div className="px-3">
                <Link href={offerLink} className="mb-3 h3">
                    {dict["currentLocale"] === "ru" ?
                        offer.item?.name
                        :
                        offer.item?.name_en
                    }
                </Link>
                    
                <div className="flex justify-between mb-2">
                    <span>{dict["price"]}</span>
                    <span>{offer.price}</span>
                </div>


                {offer.count > 0 ?
                    <div className="flex justify-between">
                        <ToBusketButton
                            offerID={offer.id}
                            className={"py-2 px-5 rounded-md"}
                        >
                            {dict["to basket"]}
                        </ToBusketButton>

                        <RedLinkReversed
                            className={"py-2 px-3 rounded-md"}
                            href={`/one-click-form/${offer.id}`}
                        >
                            <i className="bi bi-hand-index-thumb"></i>
                        </RedLinkReversed>
                    </div>
                    :
                    <BlueLink
                        className="w-full py-2 text-center rounded-lg"
                        href={`/subscribe/${offer.id}`}
                    >
                        {dict["subscribe"]}
                    </BlueLink>
                }
            </div>
        </CardWrapper>

    )
}