import {useState} from 'react'
import { useForm } from '@inertiajs/inertia-react'
import MainLayout from '@/Layouts/MainLayout'
import OfferCard from './Components/OfferCard'
import Categories from './Components/Filter/Categories'
import Filter from './Components/Filter'
import Searcher from './Components/Searcher'
import Pagination from '@/Components/Paginations/Pagination'
import OneClickBuyForm from './Components/OneClickBuyForm'

export default function(props) {
    const [showOneClickForm, setShowOneClickForm] = useState(false);
    const [oneClickOfferId, setOneClickOfferId] = useState(null);
    const filterData = props.filter;
    const {data, setData, get} = useForm({
        priceFrom:  filterData.priceFrom? filterData.priceFrom:  0,
        priceTo:    filterData.priceTo? filterData.priceTo:  0,
        selectedShapeOptions: filterData.selectedShapeOptions? filterData.selectedShapeOptions:  [],
    });

    function onHandleOneClickButtonClick (offerId){
        setOneClickOfferId(offerId);
        setShowOneClickForm(true);
    }

    const offers = props.offers.data.map((offer) => {
        return <OfferCard
                oneClickBuyHandler={()=>onHandleOneClickButtonClick(offer.id)}
                offer={offer}
            />
    });

    const oneClickForm = (showOneClickForm !== false)?
        <OneClickBuyForm
            hideFormHandler={()=>setShowOneClickForm(false)}
            offerId={oneClickOfferId}
        />
        :null;

    function onHandleSelectOptions (event){
        const id = event.target.id * 1;

        if (data.selectedShapeOptions.includes(id))
            delete data.selectedShapeOptions[data.selectedShapeOptions.find(elem => elem == id) - 1] ;
        else
            data.selectedShapeOptions.push(id);

        setData("selectedShapeOptions", data.selectedShapeOptions);
    }


    function useFilter(){
        get(route('catalog'));
    }

    function onHandleChange (event){
        setData(event.target.name, event.target.value);
    };

    return (
        <MainLayout>
            <div className="row">
                <div className="col-12 col-xxl-2 px-3">
                    <Searcher className="mb-3" />
                    <Filter
                        className="mb-3"
                        values={data}
                        onHandleChange={onHandleChange}
                        useFilter={useFilter}
                    />
                    <Categories
                        selectedShapeOptions={data.selectedShapeOptions}
                        onHandleSelectOptions={onHandleSelectOptions}
                        className="mb-3"
                    />
                </div>

                <div className="col-12 col-xxl-10 container">
                    <div className="row justify-content-around">
                        {offers}
                    </div>

                    <div className="row">
                        <Pagination links={props.offers.links} />
                    </div>
                </div>
            </div>

            {oneClickForm}
        </MainLayout>
    );
}
