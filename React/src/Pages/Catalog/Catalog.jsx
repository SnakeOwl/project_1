import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { RedButton } from "/src/Components/Buttons";
import axiosClient from "../../axios-client";
import Preloader from "../../Components/Preloader";
import PriceFilter from "./Components/Filter/PriceFilter";
import Searcher from "./Components/Filter/Searcher";
import OfferCard from "./Components/OfferCard";
import ContextGlobal from "/src/context/Global/ContextGlobal";
import Categories from "./Components/Filter/Categories";
import Pagination from "./Components/Pagination";

export default function Catalog(){
    const {category} = useParams();
    const {stateGlobal, dispatchGlobal} = useContext(ContextGlobal);
    const {lang} = stateGlobal;

    const [offers, setOffers] = useState(null);
    const [activeCategory, setActiveCategory] = useState(category);
    const [availableOptions, setAvailableOptions] = useState(null);
    const [categories, setCategories] = useState(null);
    const [filter, setFilter] = useState({
        priceFrom: 0,
        priceTo: 0,
        options: []
    });

    // нужно отчистить массив от параметров, при переходе на главную страницу.
    // иначе фильтр работает, а не должен
    if (category === undefined){
        while(filter.options.length > 0){
            filter.options.pop();
        }
    }
   
    const priceFromRef = useRef(filter.priceFrom);
    const priceToRef = useRef(filter.priceTo);

    useEffect(()=>{
        const reqData = {
            ...filter,
            category: category
        }

        axiosClient.get('catalog', {
            params: reqData
            })
            .then(({data})=>{
                setOffers(data.offers);
                setActiveCategory(data.activeCategory);
                setAvailableOptions(data.availableOptions);
                setCategories(data.categories);
            })
            .catch(error => {
                if (error.response.status === 404){
                    dispatchGlobal({
                        type: 'SET_MESSAGE',
                        message: error.response.data.message
                    });
                    
                    priceFromRef.current.value = 0;
                    priceToRef.current.value = 0;
                }
            });
    }, [category, filter.options]);

    let cards = "Загружаются предложения...";
    if (offers !== null){
        cards = offers.data.map((offer)=>{
            return <OfferCard
                key={`offer ${offer.id}`}
                offer={offer} 
                className='col-12 col-md-6 col-lg-3 col-xxl-2 me-xl-1 mb-3'
            />
        });
    }

    function useFilter(){
        setFilter({
            priceFrom: priceFromRef.current.value,
            priceTo: priceToRef.current.value,
            options: filter.options,
        });
    }

    function onHandleSelectOptions (event){
        const id = event.target.id * 1;

        if (filter.options.includes(id)){
            delete filter.options[ filter.options.findIndex(elem => elem == id) ];
        }else{
            filter.options.push(id);
        }

        filter.options = filter.options.flat();

        useFilter();
    }

    return (
        <>
            {offers === null && 
                <Preloader />
            }
            {offers !== null &&
            <>
                <div className="col-12 col-lg-2">
                    <Searcher className="mb-3" />
                    <PriceFilter 
                        priceFromRef={priceFromRef}
                        priceToRef={priceToRef}
                        className="mb-3" 
                    />

                    <RedButton
                        className="w-100 inverted mb-3"
                        onHandleClick={useFilter}
                    >
                        {lang["doFilter"]}  
                    </RedButton>
                    <Categories
                        categories={categories}
                        activeCategory={activeCategory}
                        availableOptions={availableOptions}
                        onHandleSelectOptions={onHandleSelectOptions}
                        />
                </div>
                <div className="col-12 col-lg-10">
                    <div className="row justify-content-around mb-3">
                        {cards}
                    </div>

                    <div className="row">
                        <Pagination
                            links={offers.links}
                            setOffers={setOffers}
                        />
                    </div>
                </div>
            </>
            }
        </>
    );
}