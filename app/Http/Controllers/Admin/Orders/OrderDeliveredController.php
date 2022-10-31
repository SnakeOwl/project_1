<?php
namespace App\Http\Controllers\Admin\Orders;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Order;

class OrderDeliveredController extends Controller
{
    public function __invoke(Request $request, Order $order)
    {
        $order->update([
            'date_delivered' => \Carbon\Carbon::now(),
            'status' => 'Заказ доставлен'
        ]);

        session()->flash('message', 'Заказ доставлен');

        return redirect()->back();
    }
}
