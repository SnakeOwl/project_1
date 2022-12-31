import HitIcon from '@/Components/SVGicons/HitIcon';
import NewIcon from '@/Components/SVGicons/NewIcon';
import BlueLink from '@/Components/Links/BlueLink';
import RedLink from '@/Components/Links/RedLink';
import Link from '@/Components/Links/Link';
import Img from '@/Components/Img';

export default function SkuCard({
    sku,
}) {
    return (
        <div className="col-12 col-md-6 col-lg-4 me-xl-1 col-xxl-3 mb-3 p-1 card">
            <div class="img-wrapper position-relative">
                <Link href={route('catalog-sku-details', [sku.item.category.alias, sku.item.alias, sku.id])}>
                    {sku.item.new == 1 &&
                        <div className="new-pointer" title="Новинка">
                            <NewIcon width="30" height="30" />
                        </div>
                    }
                    {sku.item.hit == 1 &&
                        <div className="hit-pointer" title="Популярный товар">
                            <HitIcon width="30" height="30" />
                        </div>
                    }
                    <Img className="rounded" src={sku.item.short_image} alt="Маленькое изображение"/>
                </Link>
            </div>

            <div className="card-body">
                <h5 className="title">
                    <Link
                        className="text-dark"
                        href={route('catalog-sku-details', [sku.item.category.alias, sku.item.alias, sku.id])}
                    >
                        {sku.item.name}
                    </Link>
                </h5>
                <p className="text mb-3">{sku.item.description}</p>
                <div className="d-flex">
                    <span className="">Цена:</span>
                    <span className="cart-price ms-auto">{sku.price}</span>
                </div>
            </div>

            <div className="card-footer py-2">
                <div className="d-flex justify-content-between">
                    <Link
                        className="bttn bttn-detail"
                        href={route('catalog-sku-details', [sku.item.category.alias, sku.item.alias, sku])}
                    >
                        Подробнее
                    </Link>


                    <RedLink
                        href={route('add-sku-to-basket', [sku])}
                        >
                        В корзину
                    </RedLink>
                </div>
            </div>
        </div>
    );
}
