<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Order;

class BasketIsNotEmpty
{
    public function handle(Request $request, Closure $next)
    {
        $order = session('order');
        if (! is_null($order) && $order->get_full_price() > 0)
            return $next($request);

        session()->forget('order');
        session()->flash('info', __('info.your basket is empty'));

        return redirect()->route('catalog');
    }
}
