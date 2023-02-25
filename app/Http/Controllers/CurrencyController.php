<?php

namespace App\Http\Controllers;

use App\Models\Currency;

class CurrencyController extends Controller
{
    public function __invoke($currencyCode)
    {
        $currency = Currency::byCode($currencyCode)->firstOrFail();
        session(['currency' => $currency->code]);

        // при активном фильтре, нужно будет числа поменять.
        // может потом придумаю как поменять числа, а пока деактивирую фильтр.
        $backUrlWithoutParams =
            stristr(app('url')->previous(), '?')
            ? stristr(app('url')->previous(), '?')
            : app('url')->previous() ;

        return redirect()->to($backUrlWithoutParams);
    }
}
