<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Classes\Currency\CurrencyConverter;
use Illuminate\Support\Facades\Auth;

class GlobalVariablesController extends Controller
{
    public function __invoke(Request $request)
    {
        return [
            'currencies' =>  CurrencyConverter::getCurrencies(),
            "currentCurrency" => CurrencyConverter::getCurrentCurrencyFromSession(),
            'currentLocale' => app()->getLocale(),
            'lang' => translations( resource_path('lang/'. app()->getLocale() .'.json')) ,
            'errors' => array(),
        ];
    }
}
