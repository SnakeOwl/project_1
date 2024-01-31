import { BlueLink } from "@/_Components/ColoredLinks";
import IOffer from "@/interfaces/IOffer";
import OfferCard from "./OfferCard";
import BigPlusLink from "@/app/[lang]/user/_Components/BigPlusLink";


interface IProps {
    itemID: string
    dict: any
    offers?: IOffer[]
}


export default function OfferList({
    itemID,
    dict,
    offers
}: IProps) {

    return (
        <div className="flex flex-wrap gap-4 justify-around">
            <div className="w-full 2xl:w-1/5">
                <BigPlusLink href={`/user/partner/goods/offers/${itemID}/form`} />
            </div>


            {offers?.map(offer =>
                <div className="w-full 2xl:w-1/5" key={offer.id}>
                    <OfferCard
                        dict={dict}
                        itemID={itemID}
                        offer={offer}
                    />
                </div>
            )
            }
        </div>
    )
}