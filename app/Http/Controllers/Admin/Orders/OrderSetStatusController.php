<?php
namespace App\Http\Controllers\Admin\Orders;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Order;

class OrderSetStatusController extends Controller
{
    public function __invoke(Request $request, Order $order)
    {
        $order->update(['status' => $request->status]);

        session()->flash('message', 'Статус заказа изменен');

        return redirect()->back();
    }
}
