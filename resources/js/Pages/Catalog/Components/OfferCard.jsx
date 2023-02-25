import {usePage} from '@inertiajs/inertia-react';
import BlueLink from '@/Components/Links/BlueLink';
import RedLink from '@/Components/Links/RedLink';
import Link from '@/Components/Links/Link';
import Img from '@/Components/Img';

export default function OfferCard({
    offer,
}) {
    const {currencies, lang, currentCurrecy} = usePage().props;

    return (
        <div className="col-12 col-md-6 col-lg-3 col-xxl-2 me-xl-1 mb-3 p-1 card">
            <div class="img-wrapper position-relative">
                <Link href={route('catalog-offer-details', [offer.item.category.alias, offer.item.alias, offer.id])}>
                    <Img className="rounded" src={offer.short_image} alt="image"/>
                </Link>
            </div>

            <div className="card-body">
                <h5 className="title fw-bold">
                    <Link href={route('catalog-offer-details', [offer.item.category.alias, offer.item.alias, offer.id])}>
                        {offer.item.name}
                    </Link>
                </h5>

                <div className="d-flex">

                    <p>
                    <span className="fs-5 fw-bold">{offer.price}</span>
                    &nbsp;
                    <span>{currentCurrecy.symbol}</span>
                    </p>
                </div>
            </div>

            <div className="card-footer py-2">
                <div className="d-flex justify-content-between">
                    <RedLink
                        className="rounded"
                        href={route('basket-add-offer', offer)}
                        >
                        {lang['toBasket']}
                    </RedLink>

                    <RedLink

                        title={lang['oneClickBuy']}
                        className="rounded inverted"
                        href={route('basket-add-offer', offer)}
                        >
                        <i class="bi bi-hand-index-thumb"></i>
                    </RedLink>
                </div>
            </div>
        </div>
    );
}
