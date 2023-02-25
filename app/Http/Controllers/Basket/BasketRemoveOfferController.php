<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\Controller;
use App\Classes\Basket\Basket;
use App\Models\Offer;

class BasketRemoveOfferController extends Controller
{
    public function __invoke(Offer $offer)
    {
        (new Basket())->removeOffer($offer);
        session()->flash('message', __('info.item removed') );

        return redirect()->route('basket');
    }

}
