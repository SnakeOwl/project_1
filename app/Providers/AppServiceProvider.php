<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Offer;
use App\Models\Order;
use App\Observers\OfferObserver;
use App\Observers\OrderObserver;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
    }

    public function boot()
    {
        Offer::observe(OfferObserver::class);
        Order::observe(OrderObserver::class);
    }
}
