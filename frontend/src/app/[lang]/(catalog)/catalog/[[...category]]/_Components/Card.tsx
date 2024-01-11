import Img from "@/_Components/Img"
import Link from 'next/link'
import ToBusketButton from "@/_Components/Buttons/ToBusketButton"
import IOffer from "@/interfaces/IOffer"
import CardWrapper from "@/_Components/CardWrapper"
import SubscribeModule from "@/app/[lang]/_Components/SubscribeModule"
import OneClickButton from "@/app/[lang]/_Components/OneClickButton"


export default function Card({
    dict,
    offer
}: {
    dict: any
    offer: IOffer
}) {

    const offerLink = `/offer/${offer.id}`;

    return (
        <CardWrapper className="2xl:w-1/6 w-full pb-4">
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

                        <OneClickButton dict={dict} offerID={offer.id} />
                    </div>
                    :
                    <SubscribeModule dict={dict} offerID={offer.id} />
                }
            </div>
        </CardWrapper>
    )
}