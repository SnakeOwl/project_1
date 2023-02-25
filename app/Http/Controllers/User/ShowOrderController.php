<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use App\Http\Requests\Auth\ShowPersonalOrderRequest;

class ShowOrderController extends Controller
{
    public function __invoke(ShowPersonalOrderRequest $request, Order $order)
    {
        $user = Auth::user();
        // dd($user->orders()); // laravel
        dd(get_class_methods($user->orders())); // laravel
        $user->orders()->findOrFail($order->id);
        dd(1);
        return Inertia::render('Auth/Order/Show', compact('order'));
    }

}
