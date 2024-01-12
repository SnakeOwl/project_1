import Match from "./Match";

export default function ListOffers({
    className="",
    matches=[]
}) {
    return (
        <div className={className}>
            {
                matches.map(offer => <Match key={`offer-${offer.id}`} offer={offer} /> )
            }
        </div>
    )
}