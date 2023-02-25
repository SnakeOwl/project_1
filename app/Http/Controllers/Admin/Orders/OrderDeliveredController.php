<?php

namespace App\Http\Controllers\Admin\Orders;

use App\Http\Controllers\Controller;
use App\Models\Order;

class OrderDeliveredController extends Controller
{
    public function __invoke(Order $order)
    {
        $order->update([
            'date_delivered' => \Carbon\Carbon::now(),
            'status' => 'Заказ доставлен'
        ]);

        session()->flash('message', 'Заказ доставлен');

        return redirect()->back();
    }
}
