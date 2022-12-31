<?php

namespace App\Http\Controllers\Admin\Order;

use App\Models\Order;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class EditOrderController extends Controller
{
    public function __invoke(Order $order)
    {
        $skus = $order->skus()->withTrashed()->get();
        return Inertia::render('Admin/Order/Form', compact('skus', 'order'));
    }
}
