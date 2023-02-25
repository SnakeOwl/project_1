import { usePage } from '@inertiajs/inertia-react';
import { useState } from 'react';
import FloatInput from '@/Components/Inputs/FloatInput';
import BlueButton from '@/Components/Buttons/BlueButton';
import Checkbox from '@/Components/Inputs/Checkbox';
import PriceFilter from './Filter/PriceFilter';

export default function Filter({
    values,
    handleChange,
    useFilter,
    className="",
}){
    const {lang} = usePage().props;

    return (
        <div className={"filter " + className}>
            <div className="filter-price mb-3">
                <span>{lang["price"]}</span>

                <PriceFilter
                    priceFrom={values.priceFrom}
                    priceTo={values.priceTo}
                    handleChange={handleChange}
                 />
            </div>

            <BlueButton
                className="w-100"
                handleClick={useFilter}
            >
                {lang["doFilter"]}
            </BlueButton>
        </div>
    );
}
