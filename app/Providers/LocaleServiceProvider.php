<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class LocaleServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Inertia::share([
            'currentLocale' => function () {
                return app()->getLocale();
            },
            'lang' => function () {
                return translations(
                    resource_path('lang/'. app()->getLocale() .'.json')
                );
            },
        ]);
    }
}
