import { Inertia } from '@inertiajs/inertia'
import MainLayout from '@/Layouts/MainLayout'
import RedButton from '@/Components/Buttons/RedButton'
import SubscribeForm from './Components/OfferDetail/SubscribeForm'
import DetailSlider from './Components/OfferDetail/DetailSlider'
import { RedLink } from '@/Components/Links'

export default function OfferDetail (props) {
    const {offer, item, itemOffersLinks, lang, currentLocale, offerIsAvailable} = props;
    const activeOptions = offer.options.map((option)=>{return option.id});

    const offerProperties = [];
    for (let key in itemOffersLinks)
    {
        const shape = itemOffersLinks[key];
        const options = [];
        for (let key2 in shape.options)
        {
            const option = shape.options[key2];
            const activeButton = (activeOptions.includes(option.id));
            options.push(
                <td>
                    {!activeButton &&
                        <RedLink
                            href={route("catalog-offer-details", [option.itemAlias, option.offerId])}
                            className="rounded inverted"
                        >
                            {currentLocale == "en"? option.value_en: option.value }
                        </RedLink>

                    }
                    {activeButton &&
                        <RedButton>
                            {currentLocale == "en"? option.value_en: option.value }
                        </RedButton>
                    }

                </td>
            );
        }

        offerProperties.push(
            <>
                <tr>
                    <td colspan="2">
                        {currentLocale == "en"? shape.name_en: shape.name }
                    </td>
                </tr>
                <tr>
                    {options}
                </tr>
            </>
        );
    };

    const itemProperties = item.parameters.map((parameter) => {
        return(
            <tr>
                <td>{currentLocale=="en"? parameter.param_name_en:parameter.param_name}</td>
                <td>{currentLocale=="en"? parameter.param_value_en:parameter.param_value}</td>
            </tr>
        )
    });

    const buttonBuy = (offerIsAvailable)
    ?
        <div className="text-center">
            <RedButton
                className="rounded"
                onHandleClick={()=>Inertia.get(route('basket-add-offer', offer))}
            >
                {lang['toBasket']}
            </RedButton>
        </div>
    :
        <SubscribeForm offer_id={offer.id} />
    ;

    return (
        <MainLayout title={props.offer.item.name + " " + lang['buy']} key={offer.id} >
            <div className="container catalog-show">
                <div className="row mb-4">
                    <div className="col-12 col-xl-6 mb-2">
                        <DetailSlider images={offer.images} />
                    </div>

                    <div className="col-12 col-xl-6">
                        <h1>{currentLocale == "en"? item.name_en: item.name }</h1>

                        <h4>{lang['offers options']}:</h4>
                        <table className="table mb-3">
                            {offerProperties}
                        </table>

                        <p>{lang['price']}: {props.offer.price}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="text-justify mb-3">
                        {currentLocale == "en"? offer.item.description_en: offer.item.description }
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <h3>{lang['item field parameters']}</h3>
                        <table className="table">
                            { itemProperties }
                        </table>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4 mx-auto">
                        { buttonBuy }
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
