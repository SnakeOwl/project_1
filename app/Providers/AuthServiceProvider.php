<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\User;
use App\Models\Order;
use App\Policies\OrderPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        Order::class => OrderPolicy::class,
    ];

    public function boot()
    {
        $this->registerPolicies();

        Gate::before(function ($user, $ability) {
            if ($user->is_admin())
                return true;
        });

        Gate::define('update', function (User $user) {
            if ($user->is_editor())
                return true;

            return false;
        });
    }
}
