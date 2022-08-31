<?php
namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\User;
use App\Models\Storage;
use App\Http\Requests\updateOrderRequest;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    public function delivered(Request $request, Order $order)
    {
        $order->update([
            'date_delivered' => \Carbon\Carbon::now(),
            'status' => 'Заказ доставлен'
        ]);
        session()->flash('info', 'Заказ доставлен');

        return redirect()->back();
    }

    public function set_courier(Request $request, Order $order)
    {
        $order->users()->attach($request->courier_id);
        session()->flash('info', 'Курьер назначен');

        return redirect()->back();
    }

    public function index()
    {
        $orders = Order::active()->paginate(25);
        return view('admin.orders.index', compact('orders'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
         $skus = $order->skus()->withTrashed()->get();
         return view( 'auth.personal.orders.show', compact('order', 'skus'));
    }

    public function edit(Order $order)
    {
        $couriers = User::couriers()->get();
        $skus = $order->skus()->get();
        return view('admin.orders.edit', compact('order', 'skus', 'couriers'));
    }

    public function update(Request $request, Order $order)
    {
        $params = $request->all();
        if (!$request->has('payment_status'))
        {
            $params['payment_status'] = 0;
        }
        $order->update($params);
        session()->flash("info", 'Заказ был обновлен');

        return redirect()->back();
    }
}
