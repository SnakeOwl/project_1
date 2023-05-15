import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "/src/axios-client";
import ContextGlobal from "/src/context/Global/ContextGlobal";

export default function PersonalOrder(){
    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;
    const {orderId} = useParams();
    const [order, setOrder] = useState({
        id:-1, 
        basket: {offers: []},
        price: 0
    });

    useEffect(()=>{
        axiosClient.get(`user/orders/${orderId}`)
            .then(({data})=>{
                if (data.order !== undefined){
                    setOrder(data.order)
                }

                if (data.message !== undefined){
                    dispatchGlobal({
                        type: 'SET_MESSAGE',
                        message: lang[data.message]
                    });
                }
            })
    }, []);
    
    console.log(order)
    const offers = order.basket.offers.map(offer=>{
        return (
            <tr key={`offer-${offer.id}`}>
                <td><Link to={`/offer/${offer.id}`}>{offer.id}</Link></td>
                <td>{offer.item.name}</td>
                <td>{offer.pivot.count}</td>
                <td>{offer.price}</td>
            </tr>
        )
    })
    
    return (
        <div className="col-12">
            <h1>{`${lang["looking order"]} # ${order.id}`}</h1>
            <h2>{lang["general information"]}</h2>
            <p>{lang["full price"]}: {order.price}</p>
            <p>{lang["order status"]}: {order.status}</p>

            <h2>{lang["list of offers in order"]}</h2>
            <table className="table">
                <thead>
                <tr>
                    <td>#</td>
                    <td>{lang['item']}</td>
                    <td>{lang['count']}</td>
                    <td>{lang['price']}</td>
                </tr>
                </thead>
                <tbody>
                    {offers}
                </tbody>
            </table>
        </div>
    )
}