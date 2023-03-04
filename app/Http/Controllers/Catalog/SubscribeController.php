<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Catalog\SubscriptionRequest;
use App\Models\Subscription;
use App\Models\Offer;

class SubscribeController extends Controller
{
    public function __invoke(SubscriptionRequest $request)
    {
        Subscription::create($request->validated());
        session()->flash('message', __('info.subscribed'));
    }
}
