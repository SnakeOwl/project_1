<?php

namespace App\Http\Controllers\Catalog;

use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\SearchRequest;
use App\Models\Offer;

class SearchController extends Controller
{
    public function __invoke(string $name)
    {
        $offers = Offer::whereHas("item", function(Builder $query) use ($name) {
            $query->where('name', "LIKE", "%".$name."%");
        })->limit(6)->with('item')->get();

        return $offers;
    }
}
