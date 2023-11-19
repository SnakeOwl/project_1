import Img from "@/Components/Img";
import Image from "next/image";
import Link from "next/link";

export default function Match({
    offer,
    className
}) {
    return (
        <div className={`${className} flex py-2`}>
            <Img className="w-16 rounded-xl mr-2" src={offer.item.short_image} />

            <div>
                <Link className="text-xl" href={`/catalog/offers/${offer.id}`}>
                    {offer.item.name}
                </Link>
                <p>{offer.price}</p>
            </div>
        </div>
    )
}