<?php
namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use App\Models\ShapeOption;
use App\Models\Shape;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;

class ShowOfferDetailController extends Controller
{
    public function __invoke($item_alias, Offer $offer)
    {
        if ($offer->item->alias != $item_alias)
            abort(404);

        $item = $offer->item->load(["offers", 'offers.options.shape', 'parameters']);
        $offer->load(['options', 'images']);

        $itemOffersLinks = [];
        foreach ($item->offers as $off){
            foreach($off->options as $option)
            {
                $itemOffersLinks[$option->shape->id]["name"] = $option->shape->name;
                $itemOffersLinks[$option->shape->id]["name_en"] = $option->shape->name_en;
                $itemOffersLinks[$option->shape->id]["options"][$option->id] = [
                    "id" => $option->id,
                    "value" => $option->value,
                    "value_en" => $option->value_en,
                    "offerId" => $off->id,
                    "itemAlias" => $item->alias
                ];
            }

        }

        $offerIsAvailable = $offer->isAvailable();
        return Inertia::render('Catalog/OfferDetail',
            compact('offer', 'offerIsAvailable', 'item', 'itemOffersLinks'));
    }
}
