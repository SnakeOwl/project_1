import {useState} from 'react';
import {usePage} from '@inertiajs/inertia-react';
import Img from '@/Components/Img';
import Link from '@/Components/Links/Link';
import FloatInput from '@/Components/Inputs/FloatInput';

export default function Searcher({className=""}){
    const [name, setName]       = useState("");
    const [matches, setMatches] = useState([]);
    const {lang, currentCurrecy} = usePage().props;

    const onHandleChange = (event) => {
        setName(event.target.value);

        if (name.length > 2)
            fetch(route("search", name))
                .then(response => response.json())
                .then(result => setMatches(result));
    };

    const offers = (matches.length > 0)?
        matches.map(function(offer){
            return (
                <Link href={route('catalog-offer-details', [offer.item.category.alias, offer.item.alias, offer.id])}>
                    <div className="p-1 my-2 match border">
                        <div className="row">
                            <div className="col-3">
                                <Img className="image w-100" src={offer.short_image} />
                            </div>
                            <div className="col-9">
                                <h5>{offer.item.name}</h5>
                                <p>{offer.price} {currentCurrecy.symbol}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            )
        })
    :
        <div></div>
    ;

    return (
        <div className={className} >
            <FloatInput
                id="name"
                labelText={lang["search"]}
                value={name}
                onHandleChange={onHandleChange}
            />

            <div id="matches">
                {offers}
            </div>
        </div>
    );
}
