<?php

namespace App\Http\Controllers\Api\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Catalog\FilterRequest;
use App\Models\Item;
use App\Models\Offer;
use App\Models\Category;
use App\Classes\Filters\OfferFilter;
use App\Classes\Filters\Filter;
use App\Classes\Filters\CategoryOptionsFilter;

class IndexController extends Controller
{
    public function __invoke(FilterRequest $request)
    {
        $params = $request->validated();
        $category_alias = $params['category'] ?? false;
        $activeCategory = null;
        $availableOptions = null;
        $availableOffers = null;

        if ($category_alias !== false)
        {
            $filter = new CategoryOptionsFilter($category_alias);
            $activeCategory = $filter->getActiveCategory()->load('shapes.shapeOptions');
            
            
            $filter->filterByPrice($params["priceFrom"] ?? 0, $params["priceTo"] ?? 0);
            unset($params["priceFrom"], $params["priceTo"]);

            if (isset($params["options"]))
            {
                $filter->filterByOption($params["options"]);
                unset($params["options"],);
            }

            $availableOffers = $filter->getAvailableOffers();

            if (count($availableOffers) === 0)
                return response(['message'=> __("info.offers not found")], 404);

            $availableOptions = $filter->getAvailableOfferShapeOptionsId();
        }
        unset($params['category']);
        $filter = new OfferFilter( array_filter($params) );
        

        $offers = ( ($category_alias)? $availableOffers->toQuery()->filter($filter)
            : Offer::filter($filter) )
            ->with('item')
            ->paginate(15)
            ->withQueryString();

        return [
            'offers' => $offers,
            'filter' => $request->validated(),
            'availableOptions' => $availableOptions,
            'activeCategory' => $activeCategory,
            'categories' => Category::get(),
        ];
    }
}
