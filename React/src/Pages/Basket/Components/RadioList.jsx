import { useContext } from "react";
import ContextGlobal from "/src/context/Global/ContextGlobal";

export function RadioList({
    storages,
    id,
    className,
    useRef,
}){
    const name = id;
    const {stateGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;

    const cards = storages.map((storage)=>{
        return (
            <div key={`storage-card-${storage.id}`} className="card mb-3">
                <div className="card-header">
                    <input 
                        id={storage.id}
                        type="radio" 
                        name={name} 
                        value={storage.id} 
                        ref={useRef}
                    />
                    <label htmlFor={storage.id}>&nbsp;{storage.name}</label>
                </div>
                <div className="card-body">
                    <p className="card-text">
                        {lang["address"]}: {storage.address} <br/>
                        {lang["phone"]}: {storage.phone} <br/>

                        {lang["schedule"]}: <span dangerouslySetInnerHTML={{__html: storage.schedule}}></span>
                    </p>
                </div>
            </div>
        );
    });

    return (
        <div 
            className={`container ${className}`}
            id={id}
        >
            {cards}
        </div>
    );
}