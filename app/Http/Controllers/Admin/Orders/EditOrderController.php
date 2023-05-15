<?php

namespace App\Http\Controllers\Admin\Orders;

use App\Models\Order;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class EditOrderController extends Controller
{
    public function __invoke(Order $order)
    {
        $offers = $order->offers()->withTrashed()->get(); 
        if($offers->count() > 0)
            $offers->load('item');

        $basket = $order->basket;
        if ($basket !== null)
            $basket->load('offers.item');

        unset($order['basket']); // Я не ебу почему, но если не удалить связь из этого объекта, то реакт выдает критическую
        
        return Inertia::render('Admin/Order/Form', 
            compact('offers', 'order', 'basket'));
    }
}
