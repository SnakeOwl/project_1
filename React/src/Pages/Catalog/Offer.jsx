import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContextGlobal from "/src/context/Global/ContextGlobal";
import Preloader from "/src/Components/Preloader";
import Carousel from "./Components/Carousel";
import { RedLink } from "/src/Components/Links";
import { RedButton } from "/src/Components/Buttons";
import SubscribeForm from "./Components/SubscribeForm";
import axiosClient from "/src/axios-client";

export default function (){
    const {offerId} = useParams();
    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);
    const [offerData, setOfferData] = useState(undefined);
    const [available, setAvailable] = useState(false);
    const [offer, setOffer] = useState(undefined);
    const {lang, currentLocale} = stateGlobal;

    useEffect(()=>{
        axiosClient.get(`catalog/${offerId}`)
            .then(({data}) =>{
                setOfferData(data);
                setAvailable(data.offerIsAvailable);
                setOffer(data.offer);
            })
            .catch(error =>{
                console.log(error);
                const {response} = error;
                if (response.status === 404)
                    window.location.href = '/404';

                console.log(response);
            })
    }, [offerId]);
    
    const offerProperties = [];
    let itemProperties;
    if (offerData !== undefined)
    {
        const activeOptions = offerData.offer.options.map((option)=>{return option.id});

        for (let key in offerData.itemOffersLinks)
        {
            const shape = offerData.itemOffersLinks[key];
            const options = [];
            for (let key2 in shape.options)
            {
                const option = shape.options[key2];
                const activeButton = (activeOptions.includes(option.id));
                options.push(
                    <td key={`offer-option-${option.id}`}>
                        {!activeButton &&
                            <RedLink
                                to={`/offer/${option.offerId}`}
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
                <tr key={`shape-name-${shape.name_en}`}>
                    <td colSpan="2">
                        {currentLocale == "en"? shape.name_en: shape.name }
                    </td>
                </tr>
            );

            offerProperties.push(
                <tr key={`shape-options-${shape.name_en}`}>
                    {options}
                </tr>
            );
        };

        itemProperties = offerData.item.parameters.map((parameter) => {
            return(
                <tr key={`item-parameter-${parameter.id}`}>
                    <td>{currentLocale=="en"? parameter.param_name_en:parameter.param_name}</td>
                    <td>{currentLocale=="en"? parameter.param_value_en:parameter.param_value}</td>
                </tr>
            )
        });
    }

    function addToCard(offerId){
        axiosClient.get(`/basket/add/${offer.id}`, {
            params: { key: localStorage.getItem("basketKey") }
        })
        .then( ({data})=>{
            dispatchGlobal({
                type: 'SET_MESSAGE',
                message: lang[data.message]
            });
        })
        .catch(error => {
            console.log(error);
            if (error.response.status === 404){
                dispatchGlobal({
                    type: 'SET_MESSAGE',
                    message: lang["offer not found"]
                });
            }
        });
    }


    return (
        <div className="col-12">
            { offerData === undefined &&
                <Preloader />
            }

            { offerData !== undefined &&
                <div className="container">
                    <div className="row mb-3">
                        <div className="col-12 col-lg-6">
                            <Carousel />
                        </div>
                        <div className="col-12 col-lg-6">
                            <h1>{ currentLocale==="en"? offerData.item.name_en: offerData.item.name}</h1>

                            
                            <h4>{lang['offers options']}:</h4>
                            <div className="overflow-x-auto">
                                <table className="table table-sm table-borderless mb-3">
                                    <tbody>
                                        {offerProperties}
                                    </tbody>
                                </table>
                            </div>

                            <p>{lang['price']}: {offerData.offer.price}</p>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12 text-justify mb-3">
                            {currentLocale == "en"? offerData.item.description_en: offerData.item.description }
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 overflow-x-auto">
                            <h3>{lang['item field parameters']}</h3>
                            <table className="table table-sm table-borderless mb-3">
                                <tbody>
                                    { itemProperties }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-3 mx-auto text-center">
                            {available &&
                                <RedButton
                                    className="rounded w-100"
                                    onHandleClick={()=>addToCard(offer.id)}
                                >
                                    {lang['toBasket']}
                                </RedButton>
                            }
                                
                            {!available &&
                                <SubscribeForm offerId={offer.id} />
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}