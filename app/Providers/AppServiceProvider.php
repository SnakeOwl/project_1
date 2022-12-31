<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\Sku;
use App\Observers\SkuObserver;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        Sku::observe(SkuObserver::class);
    }
}
