<?php

namespace App\Http\Controllers\Admin\Orders;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderPaidController extends Controller
{
    public function __invoke(Order $order)
    {
        $order->update(['payment_status' => 1]);

        session()->flash('message', 'Товар оплачен');
    }
}
