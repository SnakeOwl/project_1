import {useState} from 'react';
import {usePage} from '@inertiajs/inertia-react';
import Img from '@/Components/Img';
import Link from '@/Components/Links/Link';
import FloatInput from '@/Components/Inputs/FloatInput';

export default function Searcher({className=""}){
    const [name, setName]       = useState("");
    const [matches, setMatches] = useState([]);
    const {lang}                = usePage().props;

    const onHandleChange = (event) => {
        setName(event.target.value);
        if (name.length > 2){
            fetch(route("search", name))
                .then(response => response.json())
                .then(result => setMatches(result));
        }
    };


    const skus = (matches.length > 0)?
        matches.map(function(sku){
            return (
                <Link href={route('catalog-sku-details', [sku.item.category.alias, sku.item.alias, sku.id])}>
                    <div className="p-1 my-2 match border">
                        <div className="row">
                            <div className="col-3">
                                <Img className="image w-100" src={sku.item.short_image} />
                            </div>
                            <div className="col-9">
                                <h5>{sku.item.name}</h5>
                                <p className="description">{sku.item.description}</p>
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
                handleChange={onHandleChange}
            />

            <div id="matches">
                {skus}
            </div>
        </div>
    );
}
