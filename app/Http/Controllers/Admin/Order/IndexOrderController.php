<?php

namespace App\Http\Controllers\Admin\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Inertia\Inertia;

class IndexOrderController extends Controller
{
    public function __invoke()
    {
        $orders = Order::active()->with('currency')->paginate(25);
        return Inertia::render('Admin/Order/Index', compact('orders'));
    }
}
