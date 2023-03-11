<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use App\Classes\Basket\Basket;

class BasketAddOfferController extends Controller
{
    public function __invoke(Offer $offer)
    {
        $msg = (new Basket(true))->addOffer($offer);
        session()->flash('message', $msg);
    }
}
