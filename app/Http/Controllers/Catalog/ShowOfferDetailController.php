<?php
namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Inertia\Inertia;

class ShowOfferDetailController extends Controller
{
    public function __invoke($item_alias, Offer $offer)
    {
        if ($offer->item->alias != $item_alias)
            abort(404);

        $offer->item->parameters;
        $offer->shapeOptions = $offer->shapeOptions()->with('shape')->get();
        $offer->images;
        $offerIsAvailable = $offer->isAvailable();

        return Inertia::render('Catalog/OfferDetail', compact('offer', 'offerIsAvailable'));
    }
}
