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
use App\Classes\Filters\CategoryOptionsFilter;

class IndexController extends Controller
{
    public function __invoke(FilterRequest $request, $category_alias=false)
    {
        $params = $request->validated();
        $activeCategory = null;
        $availableOptions = null;
        $availableOffers = null;

        if ($category_alias !== false)
        {
            $filter = new CategoryOptionsFilter($category_alias);
            $activeCategory = $filter->getActiveCategory()->load('shapes.shapeOptions');

            if (isset($params["options"]))
            {
                $filter->filterByOption($params["options"]);
                unset($params["options"]);
            }

            $availableOffers = $filter->getAvailableOffers();
            $availableOptions = $filter->getAvailableOfferShapeOptionsId();
        }

        $filter = new OfferFilter( array_filter($params) );
        $offers = ( ($category_alias)? $availableOffers->toQuery()->filter($filter)
            : Offer::filter($filter) )
            ->with('item')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Catalog/Catalog', [
            'offers' => $offers,
            'search' => ($request->filled('search'))? $request->search : null,
            'filter' => $request->validated(),
            'activeCategory' => $activeCategory,
            'availableOptions' => $availableOptions,
        ]);
    }
}
