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
        // dd($request->session()->token());
        return [
            // "session" => session(),
            "csrf_token"=> csrf_token(),
            "user" => Auth::user(),
            "themeColor" => session("themeColor", "dark"),
            'currencies' =>  CurrencyConverter::getCurrencies(),
            "currentCurrecy" => CurrencyConverter::getCurrentCurrencyFromSession(),
            'currentLocale' => app()->getLocale(),
            'lang' => translations( resource_path('lang/'. app()->getLocale() .'.json')) ,
            'errors' => array(),
        ];
    }
}
