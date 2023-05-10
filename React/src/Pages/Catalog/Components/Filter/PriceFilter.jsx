import { useContext, useRef } from "react";
import ContextGlobal from "/src/context/Global/ContextGlobal";
import Input from "/src/Components/Inputs/Inputs";

export default function PriceFilter ({
    priceFromRef,
    priceToRef,
    className
}){
    const {stateGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;

    return (
        <div className={`filter-price ${className}`}>
            <p className="text-center mb-1">
                {lang['price']}
            </p>
            <div className="top-part">
                <div className="input-group mb-3">
                    <Input
                        useRef={priceFromRef}
                        placeholder={lang['from']}
                        id="priceFrom"
                        type="number"
                        step="5"
                    />
                    <Input
                        useRef={priceToRef}
                        placeholder={lang['to']}
                        id="priceTo"
                        type="number"
                        step="5"
                    />
                </div>
            </div>
        </div>
    );
}
