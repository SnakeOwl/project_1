<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Illuminate\Http\Request;


class CatalogController extends Controller
{
    public function getOffers()
    {
        return Offer::with('item')
                ->available()
                ->get()
                ->append('item_name');
    }
}
