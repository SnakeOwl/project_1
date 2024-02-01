import Img from "@/_Components/Img";
import Link from "next/link";
import IOffer from "@/interfaces/IOffer";

export default function Match({
    offer,
    className
}: {
    offer: IOffer,
    className?:string
}) {
    return (
        <div className={`${className} flex py-2`}>
            <Link href={`/offer/${offer.id}`}>
                <Img className="w-16 rounded-xl mr-2" src={offer.short_image} />
            </Link>

            <div>
                <Link className="text-xl" href={`/offer/${offer.id}`}>
                    {offer.item?.name}
                </Link>
                <p>{offer.price}</p>
            </div>
        </div>
    )
}