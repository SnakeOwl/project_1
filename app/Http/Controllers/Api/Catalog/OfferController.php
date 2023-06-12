<?php

namespace App\Http\Controllers\Api\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Offer;

class OfferController extends Controller
{
    public function __invoke(Offer $offer)
    {
        $item = $offer->item->load(["offers", 'offers.options.shape', 'parameters']);
        $offer->load(['options', 'images']);


        // подготовка других Офферов Товара (переключение между Торговыми предложениями)
        $itemOffersLinks = [];
        foreach ($item->offers as $off) {
            foreach ($off->options as $option) {
                $itemOffersLinks[$option->shape->id]["name"] = $option->shape->name;
                $itemOffersLinks[$option->shape->id]["name_en"] = $option->shape->name_en;
                $itemOffersLinks[$option->shape->id]["options"][$option->id] = [
                    "id" => $option->id,
                    "value" => $option->value,
                    "value_en" => $option->value_en,
                    "offerId" => $off->id,
                ];
            }
        }

        return compact('offer', 'itemOffersLinks');
    }
}