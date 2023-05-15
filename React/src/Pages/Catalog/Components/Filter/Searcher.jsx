import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Img from "/src/Components/Img";
import axiosClient from "/src/axios-client";
import FloatInput from "/src/Components/Inputs/FloatingInputs";
import ContextGlobal from "/src/context/Global/ContextGlobal";

export default function Searcher({
    className=""
}){
    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);
    const {lang, currentCurrecy} = stateGlobal;
    const [matches, setMatches] = useState([]);
    const nameRef = useRef();

    const handleChange = (event) => {
        
        const data ={
            name: nameRef.current.value
        }

        if (data.name.length > 2){
            axiosClient.post('catalog/search', data)
                .then(({data})=>{
                    setMatches(data);
                })
                .catch(error=>{
                    const {response} = error;

                    dispatchGlobal({
                        type: 'SET_MESSAGE',
                        message: response.data.message
                    });
                });
        }
    };

    const offers = matches.length > 0?
        matches.map((offer)=>{
            return (
                <Link to={`/offer/${offer.id}`} key={`match-offer-${offer.id}`}>
                    <div className="p-1 my-2 match border">
                        <div className="row">
                            <div className="col-3">
                                <Img className="image w-100" src={offer.short_image} />
                            </div>
                            <div className="col-9">
                                <h5>{offer.item.name}</h5>
                                <p>{offer.price}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        })
    : <></>;

    return (
        <div className={className}>
            <FloatInput
                id="name"
                labelText={lang["search"]}
                useRef={nameRef}
                onHandleChange={handleChange}
            />

            <div id="matches">
                {offers}
            </div>
        </div>
    )
}