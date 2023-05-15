import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import OfferCard from './Components/OfferCard';
import { RedLink } from '@/Components/Links';

export default function Index(props) {
    const {order, lang} = props;

    const offers = [];
    for (let offer in order.offers)
        offers.push( <OfferCard offer={order.offers[offer]} /> );

    return (
        <MainLayout title={lang['basket']}>
            <div className="container">
                <h1 className="text-center">{lang['basket']}</h1>
                <div className="row justify-content-around">
                    {offers}
                </div>


                <div className="row">
                    <div className="col-12 text-center">
                        {lang['full price']}: {order.fullPrice}
                    </div>
                    <div className="col-12 text-center">
                        <RedLink className="rouded" href="/basket/order-form" >
                            {lang['making order']}
                        </RedLink>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
