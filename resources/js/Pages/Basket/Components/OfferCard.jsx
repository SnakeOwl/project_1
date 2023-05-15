import { Inertia } from '@inertiajs/inertia';
import {usePage, InertiaLink} from '@inertiajs/inertia-react';
import {BlueButton, RedButton} from '@/Components/Buttons';
import Img from '@/Components/Img';

export default function OfferCard({offer}) {
    const {lang, currentLocale} = usePage().props;
    
    return (
        <div className="col-12 col-md-6 col-lg-3 me-xl-1 mb-3 p-1 card">
            <div class="img-wrapper position-relative">
                <Img className="rounded" src={offer.short_image} />
            </div>

            <div className="card-body">
                <h5 className="title">
                    <InertiaLink href={`/catalog/${offer.item.alias}/${offer.id}`}>
                        {currentLocale == "en"? offer.item.name_en: offer.item.name}
                    </InertiaLink>
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
                        onHandleClick={ ()=> Inertia.get(`/basket/remove/${offer.id}`) }
                    >
                        -
                    </BlueButton>

                    <RedButton
                        className="rounded"
                        onHandleClick={ ()=>Inertia.get(`/basket/add/${offer.id}`) }
                    >
                        {lang["more"]}
                    </RedButton>
                </div>
            </div>
        </div>
    );
}
