<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\Controller;
use App\Classes\Basket\Basket;
use App\Models\Offer;
use Inertia\Inertia;

class BasketIndexController extends Controller
{
    public function __invoke()
    {
        $order = (new Basket())->getOrder();

        foreach($order->offers as $offer)
            $offer->item->category;

        $order->fullPrice = $order->get_full_price();

        return Inertia::render('Basket/Index', compact('order'));
    }

}
