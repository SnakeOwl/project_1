<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\Controller;
use App\Models\Sku;
use App\Domain\Basket\Basket;

class BasketAddSkuController extends Controller
{
    public function __invoke(Sku $sku)
    {
        $msg = (new Basket(true))->addSku($sku);
        session()->flash('message', $msg);

        return redirect()->back();
    }

}
