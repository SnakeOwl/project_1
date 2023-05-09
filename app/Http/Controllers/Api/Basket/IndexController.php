<?php

namespace App\Http\Controllers\Api\Basket;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Basket\BasketRequest;
use App\Classes\Basket\DBBasket;

class IndexController extends Controller
{
    public function __invoke(BasketRequest $request)
    {
        $dbbasket = new DBBasket($request->validated()['key']);

        $basket = $dbbasket->getBasket();
        $basket->load('offers.item');
        
        return $basket;
    }
}
