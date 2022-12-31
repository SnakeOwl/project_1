import MainLayout from '@/Layouts/MainLayout';
import RedLink from '@/Components/Links/RedLink';
import Img from '@/Components/Img';
import SubscribeForm from './Components/SubscribeForm';
import CarouselWithIndicators from './Components/DetailSlider';

export default function SkuDetails(props) {
    const sku = props.sku;

    const skuProperties = sku.propertyOptions.map( (propertyOption)=>{
        return(
            <tr>
                <td>{propertyOption.property.name}</td>
                <td>{propertyOption.name}</td>
            </tr>
            );
    });

    const itemProperties = sku.item.parameters.map((parameter) => {
        return (
            <tr>
                <td>{parameter.param_name}</td>
                <td>{parameter.param_value}</td>
            </tr>
        );
    });

    let skuAvailable;
    if (props.skuIsAvailable){
        skuAvailable =
            <RedLink
                href={route('add-sku-to-basket', sku)}
                className=""
            >
                В корзину
            </RedLink>
    }else{
        skuAvailable = <>
            <span>Товара нет в наличии</span>
            <br />
            <span>Сообщить вам о поступлении товара? </span>
            <SubscribeForm className="d-inline ms-auto" />
        </>
    }

    return (
        <MainLayout
            flash={props.flash}
            errors={props.errors}
            title={sku.item.name + "Купить"}
        >
            <div className="container catalog-show">
                <div className="row mb-4">
                    <div className="col-12 col-xl-6 mb-2">
                        <CarouselWithIndicators images={sku.item.images} />
                    </div>

                    <div className="col-12 col-xl-6">
                        <h1>{sku.item.name}</h1>

                        <h4>Опции торгового предложения:</h4>
                        <table className="table mb-3">
                            {skuProperties}
                        </table>

                        <div className="text-justify mb-3">
                            {sku.item.description}
                        </div>

                        <p>Цена: {sku.price}</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <h3>Характеристики предмета</h3>
                        <table className="table">
                            { itemProperties }
                        </table>
                    </div>
                </div>

                <div className="row text-center">
                    <div className="col-12 mx-auto">
                        { skuAvailable }
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
