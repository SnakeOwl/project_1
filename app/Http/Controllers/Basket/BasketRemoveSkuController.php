<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\Controller;
use App\Domain\Basket\Basket;
use App\Models\Sku;

class BasketRemoveSkuController extends Controller
{
    public function __invoke(Sku $sku)
    {
        (new Basket())->removeSku($sku);
        session()->flash('message', __('info.item removed') );

        return redirect()->route('basket');
    }

}
