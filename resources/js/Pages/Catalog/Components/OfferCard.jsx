import {useState} from 'react';
import {usePage, useForm} from '@inertiajs/inertia-react';
import RedLink from '@/Components/Links/RedLink';
import BlueButton from '@/Components/Buttons/BlueButton';
import Link from '@/Components/Links/Link';
import Img from '@/Components/Img';
import Input from '@/Components/Inputs/Input';

export default function OfferCard({
    offer,
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
                {offer.count > 0 &&
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
                        >
                            <i class="bi bi-hand-index-thumb"></i>
                        </RedLink>
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
