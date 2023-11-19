<?php

namespace App\Http\Controllers\Api\getters;

use App\Http\Controllers\Controller;
use App\Models\Item;

class GetItemController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Item $item)
    {
        return $item->load("parameters");
    }
}
