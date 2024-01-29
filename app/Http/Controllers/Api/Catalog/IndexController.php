<?php

namespace App\Http\Controllers\Api\Catalog;

use App\Classes\Filters\CategoryOptionsFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Catalog\FilterRequest;
use App\Models\Category;
use App\Models\Offer;

class IndexController extends Controller
{
    public function __invoke(FilterRequest $request)
    {
        // Обычный серфинг по каталогу
        if ($request->missing("category_alias")){
            $offers = Offer::with('item')->paginate(15);
    
            return [
                'offers' => $offers,
                'options' => null,
            ];
        }

        
        // Далее уже серфинг с фильтрами по категории
        $params = $request->validated();

        $category = Category::where("alias", $params["category_alias"])->firstOrFail();
        $availableOffers = [];
        $availableOptions = [];

        // фильтрация по опциям
        $filter = new CategoryOptionsFilter(false, $category);
        if (isset($params["options"])) {
            $filter->filterByOption($params["options"]);
        }


        $availableOffers = $filter->getAvailableOffers();

        if (count($availableOffers) === 0)
            return response([], 404);



        // упаковка массива для удобства во фронте
        $activeCategory = $filter->getActiveCategory()->load('shapes.shapeOptions');
        $shapes = $activeCategory->shapes;

        // получение [idOption => количество доступных Предложений]
        $availableOptions = $filter->getAvailableOfferShapeOptionsId();

        $shapes = $shapes->map(function ($shape) use ($availableOptions) {
            $shape->options = $shape->shapeOptions->map(function ($option) use ($availableOptions) {
                $option->count = array_key_exists($option->id, $availableOptions) ?
                    $availableOptions[$option->id]
                    : "";

                return $option;
            });

            return $shape;
        });


        $offers = $availableOffers->toQuery()->with("item")->paginate(15);

        return [
            'offers' => $offers,
            'options' => $shapes,
        ];
    }
}