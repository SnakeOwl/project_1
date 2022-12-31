<?php

namespace App\Http\Controllers\Admin\Order;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;

class SetOrderStatusController extends Controller
{
    public function __invoke(Order $order, $status)
    {
        $order->update(['status' => $status]);

        session()->flash('message', 'Заказ доставлен');

        return redirect()->back();
    }
}
