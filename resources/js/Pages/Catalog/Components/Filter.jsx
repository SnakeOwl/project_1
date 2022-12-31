import React, { useState } from 'react';

import FloatInput from '@/Components/Inputs/FloatInput';
import BlueButton from '@/Components/Buttons/BlueButton';
import Checkbox from '@/Components/Inputs/Checkbox';


export default function Filter({
    values,
    handleChange,
    useFilter,
    className="",
}){
    return (
        <div className={"filter " + className}>
            <div className="filter-price">
                <span>Цена</span>
                <FloatInput
                    id="priceFrom"
                    labelText="Цена От"
                    value={values.priceFrom}
                    handleChange={handleChange}
                />

                <FloatInput
                    id="priceTo"
                    labelText="до"
                    value={values.priceTo}
                    handleChange={handleChange}
                />
            </div>

            <div className="tags">
                <Checkbox
                    id="isNew"
                    labelText="Новинки"
                    handleChange={handleChange}
                    checked={values.isNew}
                />

                <Checkbox
                    id="isPopular"
                    labelText="Популярные"
                    handleChange={handleChange}
                    checked={values.isPopular}
                />
            </div>

            <BlueButton
            className="w-100"
                handleClick={useFilter}
            >Фильтровать</BlueButton>
        </div>
    );
}
