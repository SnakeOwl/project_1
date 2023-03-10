<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Http\Middleware\HandleInertiaRequests as Middleware;
use App\Classes\Currency\CurrencyConverter;

class SetCurrenCurrency extends Middleware
{
    // Inertia's method sharing data
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            "currentCurrecy" => CurrencyConverter::getCurrentCurrencyFromSession()
        ]);
    }
}
