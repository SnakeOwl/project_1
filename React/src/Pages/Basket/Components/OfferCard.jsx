import { useContext } from "react";
import Img from "/src/Components/Img";
import { RedButton, BlueButton } from "/src/Components/Buttons";
import ContextGlobal from "/src/context/Global/ContextGlobal";
import { Link } from "react-router-dom";
import axiosClient from "/src/axios-client";

export default function OfferCard({
    className, 
    offer,
    updateFunction
}){
    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;

    function toCart(){
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

        updateFunction();
    }
    
    function removeFromCart(){
        axiosClient.get(`/basket/remove/${offer.id}`, {
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

        updateFunction();
    }

    return (
        <div className={`card p-1 ${className}`}>
            <div className="img-wrapper position-relative">
                <Img className="rounded" src={offer.short_image} />
            </div>

            <div className="card-body">
                <h5 className="title fw-bold">
                    <Link to={`/offer/${offer.id}`}>
                        {offer.item.name}
                    </Link>
                </h5>
                <div className="d-flex">
                    <p>
                        <span className="fs-5 fw-bold">
                            {offer.price}
                        </span>
                        &nbsp;<i className="bi bi-x-lg"></i>&nbsp;
                        <span>
                            {offer.pivot.count}
                        </span>
                    </p>
                </div>
            </div>

            <div className="card-footer py-2">
                <div className="btn-group w-100">
                    <RedButton 
                        className="btn w-75"
                        onHandleClick={toCart}
                    >
                        +
                    </RedButton>
                    <BlueButton 
                        className="btn inverted" 
                        onHandleClick={removeFromCart}
                    >
                        -
                    </BlueButton>
                </div>
            </div>
        </div>
    );
}