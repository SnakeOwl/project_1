<?php

namespace App\Http\Controllers\Api\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Offer;

class IndexController extends Controller
{
    public function __invoke()
    {
        $offers = Offer::with('item')->paginate(15);

        return $offers;
    }
}