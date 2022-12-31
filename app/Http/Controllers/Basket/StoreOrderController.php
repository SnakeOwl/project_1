<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\Controller;
use App\Domain\Basket\Basket;
use App\Domain\Basket\Requests\StoreOrderRequest;

class StoreOrderController extends Controller
{
    public function __invoke(StoreOrderRequest $request)
    {
        if ((new Basket())->storeOrder($request->safe()->all()))
            session()->flash('message', __('info.order created'));
        else
            session()->flash('message', __('info.order not created'));

        session()->forget('order');

        return redirect()->route("catalog");
    }
}
