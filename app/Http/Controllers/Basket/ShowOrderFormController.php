<?php

namespace App\Http\Controllers\Basket;

use App\Http\Controllers\Controller;
use App\Models\Storage;
use App\Domain\Basket\Basket;
use Inertia\Inertia;

class ShowOrderFormController extends Controller
{
    public function __invoke()
    {
        $storages = Storage::all();
        $order = (new Basket())->getOrder();

        return Inertia::render('Basket/OrderForm', compact('storages', 'order'));
    }
}
