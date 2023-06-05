<?php

namespace App\Http\Controllers\Api\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Category;

class GetCategoriesController extends Controller
{
    public function __invoke()
    {
        return [
            'categories' => Category::all()
        ];
    }
}