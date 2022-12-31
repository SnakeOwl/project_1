<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\User;
use App\Models\Storage;
use App\Http\Requests\updateOrderRequest;

class OrderController extends Controller
{
    public function showPersonalOrders()
    {
        $orders = Auth::user()->orders()->paginate(25);
        return view('auth.personal.orders.index', compact('orders'));
    }

    public function show(Order $order)
    {
         $skus = $order->skus()->withTrashed()->get();
         return view('auth.personal.orders.show', compact('order', 'skus'));
    }
}
