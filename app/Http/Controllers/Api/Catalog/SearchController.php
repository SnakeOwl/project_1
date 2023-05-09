<?php

namespace App\Http\Controllers\Api\Catalog;

use Illuminate\Database\Eloquent\Builder;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Catalog\SearchRequest;
use App\Models\Offer;

class SearchController extends Controller
{
    public function __invoke(SearchRequest $request)
    {
        $name = $request->validated()['name'];

        $offers = Offer::whereHas("item", function(Builder $query) use ($name) {
            $query->where('name', "LIKE", "%".$name."%");
        })->limit(6)->with('item')->get();

        return $offers;
    }
}
