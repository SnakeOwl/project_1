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

    public function show(Order $order)
    {
         $offers = $order->offers()->withTrashed()->get();
         return view('auth.personal.orders.show', compact('order', 'offers'));
    }
}
