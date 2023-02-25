import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import MainLayout from '@/Layouts/MainLayout';
import OfferCard from './Components/OfferCard';
import Filter from './Components/Filter';
import Searcher from './Components/Searcher';
import Pagination from '@/Components/Paginations/Pagination';

export default function(props) {
    console.log(props);
    const filterData = props.filter;
    const {data, setData, get} = useForm({
        priceFrom:  filterData? filterData.priceFrom:  0,
        priceTo:    filterData? filterData.priceTo:  0,
        category:   filterData? filterData.category:  0,
    });

    const offers = props.offers.data.map((offer) => {
        return <OfferCard offer={offer} /> ;
    });

    function useFilter(){
        get(route('catalog'));
    }

    function onHandleChange (event){
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };


    return (
        <MainLayout>
            <div className="row">
                <div className="col-2 px-3">
                    <Searcher />
                    <Filter
                        values={data}
                        handleChange={onHandleChange}
                        useFilter={useFilter}
                    />
                </div>

                <div className="col-10 container">
                    <div className="row justify-content-around">
                        {offers}
                    </div>

                    <div className="row">
                        <Pagination links={props.offers.links} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
