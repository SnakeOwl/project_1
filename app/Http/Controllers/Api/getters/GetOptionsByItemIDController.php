<?php

namespace App\Http\Controllers\Api\getters;

use App\Http\Controllers\Controller;
use App\Models\Item;

class GetOptionsByItemIDController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Item $item)
    {
        $item->load("category.shapes.shapeOptions");

        return $item->category;
    }
}
