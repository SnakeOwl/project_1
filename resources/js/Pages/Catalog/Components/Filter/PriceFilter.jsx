import { usePage } from '@inertiajs/inertia-react';
import Input from '@/Components/Inputs/Input';

export default function PriceFilter ({
    priceFrom,
    priceTo,
    handleChange
}){
    const {currentCurrecy} = usePage().props;

    return (
        <div className="filter-price">
            <div className="top-part">
                <div class="input-group mb-3">
                    <Input
                        placeholder="от"
                        name="priceFrom"
                        type="number"
                        value={priceFrom}
                        step="5"
                        handleChange={handleChange}/>
                    <span class="input-group-text">{currentCurrecy.symbol}</span>
                    <Input
                        placeholder="до"
                        name="priceTo"
                        type="number"
                        value={priceTo}
                        step="5"
                        handleChange={handleChange}/>
                </div>
            </div>



        </div>
    );
}
