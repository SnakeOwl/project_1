<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\Controller;
use App\Domain\Basket\Basket;
use App\Models\Sku;
use Inertia\Inertia;

class BasketIndexController extends Controller
{
    public function __invoke()
    {
        $order = (new Basket())->getOrder();

        // бля я не ебу как получить предмет через торговое предложение, with не работает
        // думаю только так смогу обойти ленивую загрузку, пока что
        foreach($order->skus as $sku)
            $sku->item->category;

        $order->fullPrice = $order->get_full_price();

        return Inertia::render('Basket/Index', compact('order'));
    }

}
