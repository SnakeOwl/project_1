<?php

namespace App\Http\Controllers\Api\Subscribers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Subscribers\SubscribeRequest;
use App\Models\Subscription;

class SubscribeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(SubscribeRequest $request)
    {
        Subscription::create($request->validated());

        return ['message'=> 'user subscribed'];
    }
}
