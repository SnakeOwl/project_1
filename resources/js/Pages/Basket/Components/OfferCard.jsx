import {usePage} from '@inertiajs/inertia-react';
import BlueLink from '@/Components/Links/BlueLink';
import RedLink from '@/Components/Links/RedLink';
import Link from '@/Components/Links/Link';
import Img from '@/Components/Img';

export default function OfferCard({offer}) {
    const {lang} = usePage().props;
    return (
        <div className="col-12 col-md-6 col-lg-3 me-xl-1 mb-3 p-1 card">
            <div class="img-wrapper position-relative">
                <Img className="rounded" src={offer.short_image} />
            </div>

            <div className="card-body">
                <h5 className="title">
                    <Link href={route('catalog-offer-details', [offer.item.category.alias, offer.item.alias, offer.id])} >
                        {offer.item.name}
                    </Link>
                </h5>
                <div className="d-flex">
                    <span>{lang['price']}:</span>
                    <span className="cart-price ms-auto">{offer.price}</span>
                </div>

                <div className="d-flex">
                    <span>{lang['count']}:</span>
                    <span className="cart-price ms-auto">{offer.countInOrder}</span>
                </div>
            </div>


            <div className="card-footer py-2">
                <div className="d-flex justify-content-between">
                    <BlueLink
                        className="inversed"
                        href={route('basket-remove-offer', offer)}
                    >
                        -
                    </BlueLink>

                    <RedLink
                        className="rounded"
                        href={route('basket-add-offer', offer)}
                    >
                        {lang["more"]}
                    </RedLink>
                </div>
            </div>
        </div>
    );
}
