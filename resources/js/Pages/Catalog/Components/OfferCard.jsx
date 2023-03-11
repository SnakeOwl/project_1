import { Inertia } from '@inertiajs/inertia'
import {useState} from 'react';
import {usePage, useForm} from '@inertiajs/inertia-react';
import BlueButton from '@/Components/Buttons/BlueButton';
import RedButton from '@/Components/Buttons/RedButton';
import Img from '@/Components/Img';
import Input from '@/Components/Inputs/Input';

export default function OfferCard({
    offer,
    oneClickBuyHandler
}) {
    const {currencies, lang, currentCurrecy} = usePage().props;
    const [subscription, setSubscription] = useState(false);
    const {data, setData, post} = useForm({
        offer_id: offer.id,
        email: ""
    });
    const onHandleSubmit = (event) => {
        event.preventDefault();
        post(route('subscribe'));
        setSubscription(false);
    }

    return (
        <div className="col-12 col-md-6 col-lg-3 col-xxl-2 me-xl-1 mb-3 p-1 card">
            <div class="img-wrapper position-relative">
                <a
                    onClick={()=>Inertia.get(route('catalog-offer-details', [ offer.item.alias, offer.id]))}
                    href="#"
                >
                    <Img className="rounded" src={offer.short_image} alt="image"/>
                </a>
            </div>

            <div className="card-body">
                <h5 className="title fw-bold">
                    <a
                        onClick={()=>Inertia.get(route('catalog-offer-details', [ offer.item.alias, offer.id]))}
                        href="#"
                    >
                        {offer.item.name}
                    </a>
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
                {offer.count > 0 &&
                    <div className="d-flex justify-content-between">
                        <RedButton
                            className="rounded"
                            onHandleClick={ ()=>Inertia.get(route('basket-add-offer', offer)) }
                        >
                            {lang['toBasket']}
                        </RedButton>

                        <RedButton
                            title={lang['one click buy']}
                            className="rounded inverted"
                            onHandleClick={oneClickBuyHandler}
                        >
                            <i class="bi bi-hand-index-thumb"></i>
                        </RedButton>
                    </div>
                }
                {(offer.count == 0 && subscription == false) &&
                    <BlueButton
                        onHandleClick={()=>setSubscription(true)}
                        className="inverted w-100 text-center"
                    >
                        {lang['subscribe']}
                    </BlueButton>
                }

                {subscription &&
                    <form onSubmit={onHandleSubmit}>
                        <Input
                            className="mb-1"
                            placeholder="email"
                            type="email"
                            onHandleChange={(e)=>setData("email", e.target.value)}
                        />
                        <BlueButton className="w-100">
                            {lang['submit']}
                        </BlueButton>

                    </form>
                }

            </div>
        </div>
    );
}
