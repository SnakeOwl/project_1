<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Classes\Currency\CurrencyConverter;

class CurrencyServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Inertia::share([
            'currencies' =>  CurrencyConverter::getCurrencies()
        ]);
    }
}
