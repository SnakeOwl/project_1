<?php

namespace App\Http\Controllers\Api\getters;

use App\Http\Controllers\Controller;
use App\Models\Category;

class GetCategoriesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        return Category::all();
    }
}
