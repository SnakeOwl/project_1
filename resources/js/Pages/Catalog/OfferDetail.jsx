import MainLayout from '@/Layouts/MainLayout';
import RedLink from '@/Components/Links/RedLink';
import Img from '@/Components/Img';
import SubscribeForm from './Components/SubscribeForm';
import CarouselWithIndicators from './Components/DetailSlider';

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
            <RedLink
                className="rounded"
                href={route('basket-add-offer', offer)}
            >
                {lang['toBasket']}
            </RedLink>
        </div>
    :
        <SubscribeForm offer_id={offer.id} />
    ;

    return (
        <MainLayout title={offer.item.name + "Купить"} >
            <div className="container catalog-show">
                <div className="row mb-4">
                    <div className="col-12 col-xl-6 mb-2">
                        <CarouselWithIndicators images={offer.images} />
                    </div>

                    <div className="col-12 col-xl-6">
                        <h1>{offer.item.name}</h1>

                        <h4>Опции торгового предложения:</h4>
                        <table className="table mb-3">
                            {offerProperties}
                        </table>

                        <div className="text-justify mb-3">
                            {offer.item.description}
                        </div>

                        <p>Цена: {offer.price}</p>
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
