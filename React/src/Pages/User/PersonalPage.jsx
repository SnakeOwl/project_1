import { useContext, useEffect, useState } from "react";
import axiosClient from "/src/axios-client";
import ContextGlobal from "../../context/Global/ContextGlobal";
import Pagination from "/src/Components/Pagination";
import { BlueLink } from "/src/Components/Links";

export default function PersonalPage(){
    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;

    const [orders, setOrders] = useState({data:[], links:[]});

    useEffect(()=>{
        axiosClient.get("user/orders")
            .then(({data})=>{
                setOrders(data.orders);
            })
            .catch(error=>{
                dispatchGlobal({
                    type: 'SET_MESSAGE',
                    message: lang["can't upload orders"]
                });
            })

    },[])

    function changePage(url){
        axiosClient.get(url)
            .then(({data})=>{
                setOrders(data.orders);
            });
    }

    const porders = orders.data.map((order=>{
        return (
            <tr key={`order-${order.id}`}>
                <td>{order.id}</td>
                <td>{order.price}</td>
                <td>{order.status}</td>
                <td>{order.payment_status === 0? lang["is paid"]: lang["is not paid"]}</td>
                <td>
                    <BlueLink 
                        className="small rounded"
                        to={`/user/orders/${order.id}`}
                    >
                        <i className="bi bi-card-list h6"></i>
                    </BlueLink>
                </td>
            </tr>
        );
    }));

    return (
        <div className="col-12">
            <h1>{lang["personal orders"]}</h1>
            <table className="table">
                <thead>
                    <tr>
                        <td>#</td>
                        <td>{lang["price"]}</td>
                        <td>{lang["order status"]}</td>
                        <td>{lang["payment status"]}</td>

                    </tr>
                </thead>
                <tbody>
                    {porders}
                </tbody>
            </table>

            <Pagination 
                links={orders.links}
                changePageFunc={changePage}
            />
        </div>
    );
}