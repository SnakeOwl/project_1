<?php

namespace App\Http\Controllers\Admin\Orders;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderPaidController extends Controller
{
    public function __invoke(Request $request, Order $order)
    {
        $paymentStatus = $request->payment_status ?? 0;
        $order->update(['payment_status' => $paymentStatus]);

        session()->flash('message', 'Статус оплаты товара изменен');

        return redirect()->back();
    }
}
