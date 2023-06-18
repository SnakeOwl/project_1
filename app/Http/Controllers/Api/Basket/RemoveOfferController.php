<?php

namespace App\Http\Controllers\Api\Basket;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Basket\BasketRequest;
use App\Classes\Basket\DBBasket;
use App\Models\Offer;

class RemoveOfferController extends Controller
{
    public function __invoke(BasketRequest $request, Offer $offer)
    {
        $basket = new DBBasket($request->validated()['key']);
        
        if ( !$basket->removeOffer($offer) )
            return response("", 500);


        return [
            'basketIsEmpty' => $basket->isEmpty()
        ];
    }
}
