<?php

namespace App\Http\Controllers\Api\Basket;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Basket\OrderStoreRequest;
use App\Classes\Basket\DBBasket;

class OrderStoreController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(OrderStoreRequest $request)
    {
        $key = $request->validated()['key'];
        $orderId = (new DBBasket($key))->storeOrder($request->validated()); 

        
        if ($orderId)
            return response(['orderId' => $orderId], 200);
        

        return response("", 400);
    }
}
