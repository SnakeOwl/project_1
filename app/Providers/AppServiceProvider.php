<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Offer;
use App\Observers\OfferObserver;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
    }

    public function boot()
    {
        Offer::observe(OfferObserver::class);
    }
}
