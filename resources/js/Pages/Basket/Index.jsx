import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import SkuCard from './Components/SkuCard';
import RedLink from '@/Components/Links/RedLink';

export default function Index(props) {
    const order = props.order;

    const skusArray = []
    for (let sku in order.skus)
        skusArray.push(order.skus[sku]);

    const skus = skusArray.map((sku) => {
        return (
            <SkuCard
                disableImageLink={true}
                disableNameLink={true}
                sku={sku}
            />
        );
    });

    return (
        <MainLayout
        flash={props.flash}
        errors={props.errors}
        title="Корзина"
        auth={props.auth}
        >

            <div className="container">
                <div className="row justify-content-around">
                    {skus}
                </div>


                <div className="row">
                    <div className="col-12 text-center">
                        Общая стоимость: {order.fullPrice}
                    </div>
                    <div className="col-12 text-center">
                        <RedLink href={route('order-form')}>
                            Оформление заказа
                        </RedLink>
                    </div>
                </div>


            </div>
        </MainLayout>
    );
}
