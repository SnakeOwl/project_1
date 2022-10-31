<?php
namespace App\Http\Controllers\Admin\Orders;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\User;
use App\Models\Storage;
use App\Http\Requests\updateOrderRequest;
use App\Http\Controllers\Controller;
use Inertia\Inertia;


class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::active()->paginate(25);

        return Inertia::render('Admin/Order/Index', compact('orders'));
    }

    public function edit(Order $order)
    {
        return Inertia::render('Admin/Order/Form', compact('order'));
    }
}
