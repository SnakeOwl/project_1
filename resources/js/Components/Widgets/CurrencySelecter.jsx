import {usePage} from '@inertiajs/inertia-react';

export default function CurrencySelecter({
    className=""
}){;
    const {currencies, currentCurrecy} = usePage().props;

    const buttonSide = (
        <button className="bttn red inverted small rounded dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
            {currentCurrecy.symbol}
        </button>
    );

    const list = currencies.map((currency)=>{
        if (currency.id == currentCurrecy.id)
            return false;

    	return (
            <li>
                <a href={route("currency-change", currency.code)} className="dropdown-item"
                >
                    {currency.symbol}
                </a>
            </li>
        )
    });

    return (
        <div className={"dropdown " + className}>
            {buttonSide}

            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {list}
            </ul>
        </div>
    );
}
