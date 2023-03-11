import { Inertia } from '@inertiajs/inertia'
import MainLayout from '@/Layouts/MainLayout'
import RedButton from '@/Components/Buttons/RedButton'
import Img from '@/Components/Img'
import SubscribeForm from './Components/OfferDetail/SubscribeForm'
import CarouselWithIndicators from './Components/OfferDetail/DetailSlider'

export default function (props) {
    const {offer, lang} = props;

    const offerProperties = offer.shapeOptions.map( (option)=>{
        if (option.shape == null || option == null)
            return false;

        return(
            <tr>
            <td>{option.shape.name}</td>
            <td>{option.value}</td>
            </tr>
        );
    });

    const itemProperties = offer.item.parameters.map((parameter) => {
        return(
            <tr>
                <td>{parameter.param_name}</td>
                <td>{parameter.param_value}</td>
            </tr>
        );
    });

    const offerAvailable = (props.offerIsAvailable)
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
        <MainLayout title={offer.item.name + " Купить"} >
            <div className="container catalog-show">
                <div className="row mb-4">
                    <div className="col-12 col-xl-6 mb-2">
                        <CarouselWithIndicators images={offer.images} />
                    </div>

                    <div className="col-12 col-xl-6">
                        <h1>{offer.item.name}</h1>

                        <h4>{lang['offers options']}:</h4>
                        <table className="table mb-3">
                            {offerProperties}
                        </table>

                        <p>{lang['price']}: {offer.price}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="text-justify mb-3">
                        {offer.item.description}
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
                        { offerAvailable }
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
