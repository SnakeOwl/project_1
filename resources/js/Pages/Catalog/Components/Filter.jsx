import { usePage } from '@inertiajs/inertia-react';
import {RedButton} from '@/Components/Buttons';
import PriceFilter from './Filter/PriceFilter';

export default function Filter({
    values,
    onHandleChange,
    useFilter,
    className="",
}){
    const {lang} = usePage().props;

    return (
        <div className={"filter " + className}>
            <div className="filter-price mb-3">
                <h5 className="text-center">{lang["price"]}</h5>

                <PriceFilter
                    priceFrom={values.priceFrom}
                    priceTo={values.priceTo}
                    onHandleChange={onHandleChange}
                 />
            </div>

            <RedButton
                className="w-100 inverted"
                onHandleClick={useFilter}
            >
                {lang["doFilter"]}
            </RedButton>
        </div>
    );
}
