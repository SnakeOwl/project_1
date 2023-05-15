import { useContext } from "react";
import axiosClient from "/src/axios-client";
import {BlueButton} from "/src/Components/Buttons";
import ContextGlobal from "/src/context/Global/ContextGlobal";

export default function LocaleChanger({className}){
    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);

    const localLocale = localStorage.getItem("locale");
    const cLocale = localLocale? localLocale: "ru";

    function changeLocale(){
        const tLocale = cLocale == "en"? "ru": "en";
        axiosClient.get(`/lang/${tLocale}`)
            .then(({data})=>{
                dispatchGlobal({
                    type: "SET_LANG",
                    lang: data
                });

                localStorage.setItem("locale", tLocale);
            });
    }

    const bText = cLocale == "en"? "Ru": "En";

    return (
        <BlueButton
            className={className}
            onHandleClick={changeLocale}
        >
            {bText}
        </BlueButton>
    );
}