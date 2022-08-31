<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubscriptionRequest;
use App\Models\Subscription;
use App\Models\Sku;

class SubscriptionController extends Controller
{
    public function store(StoreSubscriptionRequest $request, Sku $sku)
    {
        $params = $request->all();
        $params['sku_id'] = $sku->id;
        Subscription::create($params);
        session()->flash('info', 'Вы были подписаны на рассылку, мы вас оповестим при поступлении товара');

        return redirect()->back();
    }
}
