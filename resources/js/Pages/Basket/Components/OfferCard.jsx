import { Inertia } from '@inertiajs/inertia';
import {usePage} from '@inertiajs/inertia-react';
import BlueButton from '@/Components/Buttons/BlueButton';
import RedButton from '@/Components/Buttons/RedButton';
import Img from '@/Components/Img';
import { Link } from '@inertiajs/inertia-react';

export default function OfferCard({offer}) {
    const {lang, currentLocale} = usePage().props;
    
    return (
        <div className="col-12 col-md-6 col-lg-3 me-xl-1 mb-3 p-1 card">
            <div class="img-wrapper position-relative">
                <Img className="rounded" src={offer.short_image} />
            </div>

            <div className="card-body">
                <h5 className="title">
                    <Link href={route('catalog-offer-details', [ offer.item.alias, offer.id])}>
                        {currentLocale == "en"? offer.item.name_en: offer.item.name}
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
                    <BlueButton
                        className="inversed"
                        onHandleClick={ ()=> Inertia.get(route('basket-remove-offer', offer)) }
                    >
                        -
                    </BlueButton>

                    <RedButton
                        className="rounded"
                        onHandleClick={ ()=> Inertia.get(route('basket-add-offer', offer)) }
                    >
                        {lang["more"]}
                    </RedButton>
                </div>
            </div>
        </div>
    );
}
