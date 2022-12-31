import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import MainLayout from '@/Layouts/MainLayout';
import SkuCard from './Components/SkuCard';
import Filter from './Components/Filter';
import Searcher from './Components/Searcher';
import Pagination from '@/Components/Paginations/Pagination';

const LocaleContext = React.createContext("ru");

export default function Catalog(props) {
    const filterData = props.filter;
    const {data, setData, get} = useForm({
        priceFrom:  filterData? filterData.priceFrom:  0,
        priceTo:    filterData? filterData.priceTo:  0,
        category:   filterData? filterData.category:  0,
        isNew:      filterData? filterData.isNew === "true" : true,
        isPopular:  filterData? filterData.isPopular === "true": false,
    });

    const showedSkus = props.skus.data.map((sku) => {
        return <SkuCard sku={sku} /> ;
    });
    
    function useFilter(){
        get(route('catalog'));
    }

    function onHandleChange (event){
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };


    return (
        <MainLayout>
            <div className="row catalog">
                <div className="col-2">
                    <Searcher />
                    <Filter
                        className="px-2"
                        values={data}
                        handleChange={onHandleChange}
                        useFilter={useFilter}
                    />
                </div>

                <div className="col-10 container">
                    <div className="row justify-content-around">
                        {showedSkus}
                    </div>
                    <div className="row">
                    <Pagination
                        className="justify-content-center"
                        links={props.skus.links}
                     />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
