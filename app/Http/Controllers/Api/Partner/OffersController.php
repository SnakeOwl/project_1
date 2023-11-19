<?php

namespace App\Http\Controllers\Api\Partner;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use App\Models\Item;
use App\Http\Requests\Api\Partner\Offers\StoreOfferRequest;
use App\Http\Requests\Api\Partner\Offers\UpdateOfferRequest;
use App\Http\Requests\Api\Partner\Offers\DestroyOfferRequest;


class OffersController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOfferRequest $request, Item $item)
    {
        $params = $request->validated();
        $params["item_id"] = $item->id;
        (new Offer)->customCreate($params);

        return response("", 204);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOfferRequest $request, Item $item, Offer $offer)
    {
        $offer->customUpdate($request->validated());

        return response("", 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DestroyOfferRequest $request, Item $item, Offer $offer)
    {
        $offer->delete();

        return response("", 204);
    }


    public function index(Item $item)
    {
        return $item->offers;
    }    

    public function edit(Item $item, Offer $offer)
    {
        
        $offer->load(["images"]);
        $offer["optionsIDs"] = $offer->options()->allRelatedIds();
        return $offer;
    }
}
