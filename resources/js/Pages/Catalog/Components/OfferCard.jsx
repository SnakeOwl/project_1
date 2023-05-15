import { Inertia } from '@inertiajs/inertia'
import {useState} from 'react';
import {usePage, useForm, InertiaLink} from '@inertiajs/inertia-react';
import {BlueButton, RedButton} from '@/Components/Buttons';
import Img from '@/Components/Img';
import Input from '@/Components/Inputs/Input';

export default function OfferCard({
    offer,
    oneClickBuyHandler
}) {
    const {currencies, lang, currentCurrecy, currentLocale} = usePage().props;
    const [subscription, setSubscription] = useState(false);
    const {data, setData, post} = useForm({
        offer_id: offer.id,
        email: ""
    });
    const onHandleSubmit = (event) => {
        event.preventDefault();
        post('/catalog/subscribe');
        setSubscription(false);
    }

    return (
        <div className="col-12 col-md-6 col-lg-3 col-xxl-2 me-xl-1 mb-3 p-1 card">
            <div class="img-wrapper position-relative">
                <InertiaLink href={`/catalog/${offer.item.alias}/${offer.id}`}>
                    <Img className="rounded" src={offer.short_image} alt="image"/>
                </InertiaLink>
            </div>

            <div className="card-body">
                <h5 className="title fw-bold">
                    <InertiaLink href={`/catalog/${offer.item.alias}/${offer.id}`}>

                        {currentLocale == "en"? offer.item.name_en: offer.item.name}
                    </InertiaLink>
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
                            onHandleClick={()=>Inertia.get(`/basket/add/${offer.id}`)}
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
                            id="email"
                            className="mb-1"
                            placeholder="email"
                            type="email"
                            autocomplete='on'
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
