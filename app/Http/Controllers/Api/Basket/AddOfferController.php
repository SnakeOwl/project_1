<?php

namespace App\Http\Controllers\Api\Basket;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Api\Basket\AddOfferRequest;

use App\Classes\Basket\DBBasket;
use App\Models\Offer;

class AddOfferController extends Controller
{
    public function __invoke(AddOfferRequest $request, Offer $offer)
    {
        $busket = null;
        $bKey = $request->validated()['key'] ?? null;
        
        $basket = (new DBBasket($bKey));

        if ($basket->addOffer($offer) === false)
            return response("No mo offers", 404);


        return response([
            'bkey' => $basket->getKey()
        ]);
    }
}
