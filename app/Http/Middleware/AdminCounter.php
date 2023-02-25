<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Http\Middleware\HandleInertiaRequests as Middleware;
use App\Models\Item;
use App\Models\Offer;
use App\Models\Order;

class AdminCounter extends Middleware
{
    // Inertia's method sharing data
    public function share(Request $request)
    {
        return array_merge(parent::share($request), [
            "menuInfo" =>[
                "countItems" => Item::count(),
                "countOffers" => Offer::count(),
                "countOrders" => Order::count()
            ]
        ]);
    }
}
