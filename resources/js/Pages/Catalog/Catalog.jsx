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
    const {activeCategory, filter} = props;
    const [showOneClickForm, setShowOneClickForm] = useState(false);
    const [oneClickOfferId, setOneClickOfferId] = useState(null);
    const {data, setData, get} = useForm({
        priceFrom:  filter.priceFrom? filter.priceFrom:  0,
        priceTo:    filter.priceTo? filter.priceTo:  0,
        options: filter.options? filter.options.map(($value)=>{return $value*1}): [],
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

    function useFilter(){
        if (activeCategory === null)
            get('/catalog');
        else
            get(`/catalog/${activeCategory.alias}`);
    }

    function onHandleSelectOptions (event){
        const id = event.target.id * 1;

        if (data.options.includes(id))
            delete data.options[ data.options.findIndex(elem => elem == id) ];
        else
            data.options.push(id);

        data.options = data.options.flat();
        setData("options", data.options);

        useFilter()
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
                        selectedOptions={data.options}
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

            {showOneClickForm !== false &&
                <OneClickBuyForm
                    hideFormHandler={()=>setShowOneClickForm(false)}
                    offerId={oneClickOfferId}
                />
            }
        </MainLayout>
    );
}
