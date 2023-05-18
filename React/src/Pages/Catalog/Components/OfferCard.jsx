import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ContextGlobal from "/src/context/Global/ContextGlobal";
import Img from "/src/Components/Img";
import { RedButton, BlueButton } from "/src/Components/Buttons";
import axiosClient from "/src/axios-client";

export default function OfferCard({
    className, 
    offer,
    oneClickHandler,
}){
    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;
    const [subscribeMode, setSubscribeMode] = useState(false);
    const emailRef = useRef();

    async function toCart(){
        await axiosClient.get(`/basket/add/${offer.id}`, {
            params: { key: localStorage.getItem("basketKey") }
        })
        .then( ({data})=>{
            dispatchGlobal({
                type: 'SET_MESSAGE',
                message: lang[data.message]
            });
            localStorage.setItem("basketKey", data.bKey);
        })
        .catch(error => {
            console.log(error);
            if (error.response.status === 404){
                dispatchGlobal({
                    type: 'SET_MESSAGE',
                    message: lang["offer not found"]
                });
                
                priceFromRef.current.value = 0;
                priceToRef.current.value = 0;
            }
        });
    }

    function subscribe(e){
        e.preventDefault();

        axiosClient.post('/subscribe', {
            email: emailRef.current.value,
            offer_id: offer.id
        }).then(({data})=>{
            dispatchGlobal({
                type: 'SET_MESSAGE',
                message: lang[data.message]
            });
            setSubscribeMode(false);
        }).catch(error=>{
            dispatchGlobal({
                type: 'SET_MESSAGE',
                message: error.response.data.message
            });
        });
    }

    const sub = subscribeMode?
        <form onSubmit={subscribe}>
            <input 
                className="form-control mb-1"
                id="email"
                type="email" 
                ref={emailRef}
                minLength="9"
                placeholder="email"
                autoComplete="on"
                required
            />
            <BlueButton className="w-100">
                {lang['subscribe']}
            </BlueButton>
        </form>
    :
        <BlueButton
            className="inverted w-100"
            onHandleClick={()=>setSubscribeMode(true)}
        >
            {lang['subscribe']}
        </BlueButton>
    ;


    return (
        <div className={`card p-1 ${className}`}>
            <div className="img-wrapper position-relative">
                <Link to={`/offer/${offer.id}`}>
                    <Img className="rounded" src={offer.short_image} />
                </Link>
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
                    </p>
                </div>
            </div>

            <div className="card-footer py-2">
                {offer.count > 0 &&
                    <div className="d-flex justify-content-between">
                    
                        <RedButton 
                            onHandleClick={toCart}
                            className="rounded"
                        >
                            {lang['toBasket']}
                        </RedButton>
                        <RedButton 
                            onHandleClick={oneClickHandler}
                            className="rounded inverted" 
                            title={lang['one click buy']}
                        >
                            <i className="bi bi-hand-index-thumb"></i>
                        </RedButton>
                
                    
                    </div>
                } 
                {offer.count === 0 &&
                    sub
                }
            </div>
        </div>
    )
}
