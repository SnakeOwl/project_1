import {Inertia} from '@inertiajs/inertia';
import {usePage} from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/inertia-react';

export default function CurrencySelecter({
    className=""
}){;
    const {currencies, currentCurrecy} = usePage().props;

    const buttonSide = (
        <button className="bttn green inverted small rounded dropdown-toggle"
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
                <Link
                    href={`/currency/${currency.code}`}
                    className="dropdown-item"
                >
                    {currency.symbol}
                </Link>
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
