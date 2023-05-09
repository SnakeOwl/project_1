import { useContext, useEffect, useState } from "react";
import axiosClient from "../../axios-client";
import ContextGlobal from "../../context/Global/ContextGlobal";

// по начальной задумке, компонент используется для единичного получения информации о глобальных перменных от BackEnd
// типо как валюты, ланговые файлы ...
export default function PostEffectHandler(){
    const {dispatchGlobal} = useContext(ContextGlobal)
    
    useEffect(()=>{
        axiosClient.post('global-variables')
            .then(({data}) =>{
                dispatchGlobal({
                    type: 'INIT',
                    currencies: data.currencies,
                    currentCurrency: data.currentCurrency,
                    currentLocale: data.currentLocale,
                    lang: data.lang,
                });
            })
            .catch(error => {
                const {response} = error;
                console.log("Error getting global variables.");
                console.log(error.response.data.message);
            });

        if (localStorage.getItem('ACCESS_TOKEN') !== null){
            axiosClient.get('/user')
                .then(({data}) =>{
                    dispatchGlobal({
                        type: 'SET_USER',
                        user: data
                    });
                })
                .catch(error => {
                    const {response} = error;
                    console.log("Error getting user information.");
                    console.log(error.response.data.message);
                });
        }
    }, []); 



        
    

    return (<></>);
}