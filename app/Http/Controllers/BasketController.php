<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Sku;
use App\Models\Order;
use App\Models\User;
use App\Models\Storage;
use App\Classes\Basket;
use App\Http\Requests\CreateOrderRequest;

class BasketController extends Controller
{
    public function addSku(Sku $sku)
    {
        $msg = (new Basket(true))->addSku($sku);
        session()->flash('info', $msg);

        return redirect()->back();
    }

    public function removeSku(Sku $sku)
    {
        (new Basket())->removeSku($sku);
        session()->flash('info', __('info.item removed') );

        return redirect()->route('basket');
    }

    public function index()
    {
        $order = (new Basket())->getOrder();

        return view('catalog.basket', compact('order'));
    }

    // return form
    public function createOrder()
    {
        $storages = Storage::all();
        $order = (new Basket())->getOrder();

        return view('orders.form-order' , compact('storages', 'order') );
    }

    public function storeOrder(CreateOrderRequest $request)
    {
        if ( (new Basket())->storeOrder($request->all())){
            session()->flash('info', __('info.order created'));
        }else{
            session()->flash('info', __('info.order not created'));
        }

        session()->forget('order');

        return redirect()->route("catalog");
    }
}
