<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\FilterRequest;
use App\Models\Item;
use App\Models\Offer;
use App\Models\Category;
use App\Classes\Filters\OfferFilter;
use App\Classes\Filters\Filter;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function __invoke(FilterRequest $request, $category_alias=null)
    {
        $params = $request->validated();

        $activeCategory = null;
        if ($category_alias !== null)
        {
            $activeCategory = Category::byAlias($category_alias)->load('shapes.shapeOptions');
            $params['category'] = $activeCategory->id;
        }

        $filter = new OfferFilter( array_filter($params) );
        $offers = Offer::filter($filter)->with('item')->paginate(15)->withQueryString();

        return Inertia::render('Catalog/Catalog', [
            'offers' => $offers,
            'search' => ($request->filled('search'))? $request->search : null,
            'filter' => $params,
            'activeCategory' => $activeCategory,
        ]);
    }
}
