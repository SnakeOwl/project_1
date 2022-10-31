<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\FilterRequest;
use App\Models\Item;
use App\Models\Category;
use App\Models\Sku;
use Inertia\Inertia;
use App\Classes\Filter;

class CatalogIndexController extends Controller
{
    public function __invoke(FilterRequest $request)
    {
        $filter = new Filter();
        $skuQuery = $filter->filter($request);
        $usedCategory = $filter->getUsedCategory();

        $skus = $skuQuery->paginate(12);

        return Inertia::render('Catalog/Catalog', [
            'skus' => $skus,
            'search' => ($request->filled('search'))? $request->search : null,
            'categories' => Category::all()
        ]);
    }
}
