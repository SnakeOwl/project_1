import { useContext, useEffect, useRef, useState } from "react";
import axiosClient from "/src/axios-client";
import { RadioList } from "./Components/RadioList";
import {FloatInput, FloatSelect} from "/src/Components/Inputs/FloatingInputs";
import ContextGlobal from "/src/context/Global/ContextGlobal";
import Preloader from "/src/Components/Preloader";
import { RedButton } from "/src/Components/Buttons";
import { Navigate } from "react-router-dom";

export default function OrderForm(){
    const key = localStorage.getItem('basketKey');
    
    if (key === null)
        return <Navigate to="/" />;
    
    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;

    const [basket, setBasket] = useState(null);
    const [storages, setStorages] = useState(null);
    

    const nameRef = useRef("");
    const emailRef = useRef("");
    const phoneRef = useRef("");
    const payment_methodRef = useRef();

    const delivery_methodRef = useRef();
    const addressRef = useRef("");
    const post_indexRef = useRef("");
    const storage_idRef = useRef("");

    const paymentMethods = [
        {
            id: "cashe",
            name: "Оплата при получении",
            name_en: "Payment upon receipt",
        },
        {
            id: "card",
            name: "Оплата картой",
            name_en: "Card pay",
        },
    ];

    // по хорошему всё это можно в базу перенести
    const delyveryMethods = [
        {
            id: "courier",
            name: "Доставка курьером",
            name_en: "Courier delivery",
        },
        {
            id: "post",
            name: "Доставка почтой",
            name_en: "Post delivery",
        },
        {
            id: "storage",
            name: "Доставка до точки самовывоза",
            name_en: "Storage delivery",
        }
    ];

    useEffect(()=>{
        axiosClient.get('/basket/create-order', {
            params: {key: localStorage.getItem("basketKey")}
        })
        .then(({data})=>{
            setStorages(data.storages);
            setBasket(data.basket);
        })
        .catch(error=>{
            console.log(error);
        })
    }, []);

    // при изменении способа доставки нужно изменять видимые поля
    const changeDelivery = (event)=>{
        const value = event.target.options[event.target.selectedIndex].value;

        switch (value) {
            case "post":
                address.parentElement.parentElement.classList.remove("d-none");
                post_index.parentElement.parentElement.classList.remove("d-none");
                storage_id.classList.add("d-none");
            break;

            case "courier":
                address.parentElement.parentElement.classList.remove("d-none");
                post_index.parentElement.parentElement.classList.add("d-none");
                storage_id.classList.add("d-none");
            break;

            case "storage":
                address.parentElement.parentElement.classList.add("d-none");
                post_index.parentElement.parentElement.classList.add("d-none");
                storage_id.classList.remove("d-none");
            break;
        }
    }

    function handleSubmit(event){
        event.preventDefault();
        const rdata = {
            key: key,

            name: nameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            payment_method: payment_methodRef.current.value,

            delivery_method: delivery_methodRef.current.value,
            address: addressRef.current.value,
            post_index: post_indexRef.current.value,
            storage_id: storage_idRef.current.value,
        }

        axiosClient.post('basket/store-order', rdata)
            .then(({data})=>{
                dispatchGlobal({
                    type: 'SET_MESSAGE',
                    message: `${lang[data.message]}. ${lang["Your Order's number is"]} ${data.orderId}`
                });
            })
            .catch(error=>{
                dispatchGlobal({
                    type: 'SET_MESSAGE',
                    message: lang['Something is wrong']
                });
            });
    }

    return (
        <div className="container">
            <h1 className="text-center mb-3">{lang['checkout']}</h1>
            {basket === null &&
                <Preloader />
            }

            {basket !== null &&
            <form className="row" onSubmit={handleSubmit}>
                <div className="col-12 col-lg-3 mx-auto">
                    <FloatInput
                        id='name'
                        labelText={lang['name']}
                        className="mb-3"
                        useRef={nameRef}
                        required
                    />

                    <FloatInput
                        id='email'
                        type="email"
                        labelText='email'
                        className="mb-3"
                        useRef={emailRef}
                    />

                    <FloatInput
                        id='phone'
                        labelText={lang["phone"]}
                        className="mb-3"
                        minLength="8"
                        useRef={phoneRef}
                        required
                    />

                    <FloatSelect
                        id="payment_method"
                        useRef={payment_methodRef}
                        options={paymentMethods}
                        className="mb-3"
                        labelText={lang["payment method"]}
                        selectedOptionIds="card"

                    />

                    <FloatSelect
                        id="delivery_method"
                        useRef={delivery_methodRef}
                        options={delyveryMethods}
                        className="mb-3"
                        labelText={lang["delivery method"]}
                        selectedOptionIds="courier"
                        onHandleChange={changeDelivery}
                    />

                    <FloatInput
                        id='address'
                        labelText={lang["address"]}
                        className="mb-3"
                        useRef={addressRef}
                    />

                    <FloatInput
                        id='post_index'
                        labelText={lang['post index']}
                        className="mb-3 d-none"
                        useRef={post_indexRef}

                    />

                    <RadioList
                        id="storage_id"
                        storages={storages}
                        className="d-none"
                        useRef={storage_idRef}
                    />

                    <FloatInput
                        labelText={lang["price"]}
                        className="mb-3"
                        value={basket.price}
                        disabled={true}
                    />
                    <RedButton className="w-100">
                        {lang['submit']}
                    </RedButton>
                </div>
            </form>
            }
        </div>
    );
}