<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\FilterRequest;
use App\Models\Item;
use App\Models\Category;
use App\Models\Sku;
use App\Domain\Filters\SkuFilter;
use App\Domain\Filters\Filter;
use Inertia\Inertia;

class CatalogIndexController extends Controller
{
    public function __invoke(FilterRequest $request)
    {
        $params = $request->validated();
        $filter = new SkuFilter( array_filter($params) );
        $skus = Sku::filter($filter)->with('item', 'item.category')->paginate(5)->withQueryString();

        return Inertia::render('Catalog/Catalog', [
            'skus' => $skus,
            'search' => ($request->filled('search'))? $request->search : null,
            'categories' => Category::all(),
            'filter' => $params,
        ]);
    }
}
