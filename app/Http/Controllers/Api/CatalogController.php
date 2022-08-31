<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sku;
use Illuminate\Http\Request;


class CatalogController extends Controller
{
    public function getSkus()
    {

        return Sku::with('item')
                ->available()
                ->get()
                ->append('item_name');
    }
}
