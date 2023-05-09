<?php

namespace App\Http\Controllers\Api\Basket;

use App\Http\Controllers\Controller;
use App\Models\Storage;
use App\Classes\Basket\DBBasket;
use App\Http\Requests\Api\Basket\BasketRequest;

class CreateOrderController extends Controller
{
    public function __invoke(BasketRequest $request)
    {
        $dbbasket = new DBBasket($request->validated()['key']);

        return [
            'storages' => Storage::all(),
            'basket' => $dbbasket->getBasket()
        ];
    }
}
