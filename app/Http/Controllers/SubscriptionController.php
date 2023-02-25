<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubscriptionRequest;
use App\Models\Subscription;
use App\Models\Offer;

class SubscriptionController extends Controller
{
    public function store(StoreSubscriptionRequest $request, Offer $offer)
    {
        $params = $request->all();
        $params['offer_id'] = $offer->id;
        Subscription::create($params);
        session()->flash('message', __('user subscribed'));

        return redirect()->back();
    }
}
