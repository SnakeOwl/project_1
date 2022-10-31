import React from 'react';
import SystemImage from '@/Components/SystemImage';
import HitIcon from '@/Components/SVGicons/HitIcon';
import NewIcon from '@/Components/SVGicons/NewIcon';

export default function SkuCard({
    sku
}) {
    return (
        <div className="col-12 col-md-6 col-lg-4 me-xl-1 col-xxl-3 mb-3 p-1 card">
            <div class="img-wrapper position-relative">
            <a href={route('catalog-sku-details', [sku.item.category.alias, sku.item.alias, sku.id])}>
            {
                sku.item.new == 1 &&
                <div className="new-pointer" title="Новинка">
                    <NewIcon width="30" height="30" />
                </div>
            }
            {
                sku.item.hit == 1 &&
                <div className="hit-pointer" title="Популярный товар">
                    <HitIcon width="30" height="30" />
                </div>
            }

                <img className="rounded" src={"storage/" + sku.item.short_image} alt="Маленькое изображение" />
            </a>
            </div>

            <div className="card-body">
                <h5 className="title">
                <a className="text-dark" href={route('catalog-sku-details', [sku.item.category.alias, sku.item.alias, sku.id])}>{sku.item.name}</a>
                </h5>
                <p className="text">{sku.item.description}</p>
                <div className="d-flex mt-4">
                    <span className="">Цена:</span>
                    <span className="cart-price ms-auto">{sku.price}</span>
                </div>
            </div>

            <div className="card-footer">
                <div className="d-flex mt-3">
                    <a className="bttn blue" href={route('catalog-sku-details', [sku.item.category.alias, sku.item.alias, sku.id])}>
                    Подробнее</a>

                    <form class="d-inline ms-auto" action="" method="post">
                        <input type="hidden" name="_token" value="OE7ORGXBnaWzGi5Ub5RcdjnSbhJ6CLpFXCL6Zqk7"/>
                        <input type="hidden" name="count" value="1"/>

                        <button class="bttn red" type="submit">В корзину</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
