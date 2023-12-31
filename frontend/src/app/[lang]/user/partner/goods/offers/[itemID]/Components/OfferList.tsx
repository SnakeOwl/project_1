import { BlueLink } from "@/_Components/ColoredLinks";
import IOffer from "@/interfaces/IOffer";
import OfferCard from "./OfferCard";


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
        <div className="flex mb-4">
            <div className="2xl:w-1/5 px-2">
                <BlueLink
                    href={`/user/partner/goods/offers/${itemID}/form`}
                    className="w-full text-center py-16">
                    <i className="bi bi-plus-lg"></i>
                </BlueLink>
            </div>


            {offers?.map(offer => {
                return (
                    <div className="2xl:w-1/5 px-2" key={offer.id}>
                        <OfferCard
                            dict={dict}
                            itemID={itemID}
                            offer={offer}
                         />
                    </div>
                );
            })
            }
        </div>
    )
}