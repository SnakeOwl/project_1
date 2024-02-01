import IOffer from "@/interfaces/IOffer";
import Match from "./Match";

export default function ListOffers({
    className="",
    matches=[]
}:{
    className?:string,
    matches: IOffer[]
}) {
    return (
        <div className={className}>
            { matches.map(offer => <Match key={`offer-${offer.id}`} offer={offer} /> ) }
        </div>
    )
}