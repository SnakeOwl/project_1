import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { RedLink } from "/src/Components/Links";
import ContextGlobal from "/src/context/Global/ContextGlobal";
import OfferCard from "./Components/OfferCard";
import axiosClient from "/src/axios-client";
import Preloader from "/src/Components/Preloader";

export default function Basket(){
    const {stateGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;
    const [basket, setBasket] = useState(null);

    const key = localStorage.getItem("basketKey");
    
    if (key === null)
        return <Navigate to="/" />;

    function updateBasket(){
        axiosClient.get('/basket/index', {
            params: {key: key}
        })
        .then(({data})=>{
            setBasket(data);
        })
        .catch(error=>{
            console.log(error);
        })
    }

    useEffect(()=>{
        updateBasket();
    }, []);

    let offers = null;
    if (basket !== null){
        offers = basket.offers.map((offer)=>{
            return <OfferCard 
                key={`offer-${offer.id}`}
                className={"col-12 col-lg-3 me-lg-3 mb-3"}
                offer={offer} 
                updateFunction={updateBasket}
            />
        });
    }

    return (
        <div className="col-12">
            {basket === null &&
                <Preloader />
            }

            {basket !== null &&   
            <div className="container">
                <div className="row justify-content-around">
                    {offers}
                </div>
                <div className="row">
                    <p className="text-center">{`${lang["sum to pay"]} ${basket.price}`}</p>
                    <RedLink 
                        to="/basket/order"
                        className="col-12 col-lg-2 text-center mx-auto"
                    >
                        {lang["checkout"]}
                    </RedLink>
                </div>
            </div>
            }
        </div>
    );
}