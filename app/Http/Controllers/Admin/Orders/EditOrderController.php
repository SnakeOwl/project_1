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
        return Inertia::render('Admin/Order/Form', compact('offers', 'order'));
    }
}
