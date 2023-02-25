<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\FilterRequest;
use App\Models\Item;
use App\Models\Category;
use App\Models\Offer;
use App\Classes\Filters\OfferFilter;
use App\Classes\Filters\Filter;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function __invoke(FilterRequest $request)
    {
        $params = $request->validated();
        // dd($params);
        $filter = new OfferFilter( array_filter($params) );
        $offers = Offer::filter($filter)->with('item', 'item.category')->paginate(15)->withQueryString();

        return Inertia::render('Catalog/Catalog', [
            'offers' => $offers,
            'search' => ($request->filled('search'))? $request->search : null,
            'categories' => Category::all(),
            'filter' => $params,
        ]);
    }
}
