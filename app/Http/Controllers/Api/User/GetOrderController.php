<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class GetOrderController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Order $order, Request $request)
    {
        $user = $request->user();
        $order = $user->orders()->find($order->id);
        if ($order === null)
            return response("", 404);
        

        $order->load('basket.offers.item');
        return ['order' => $order];
    }
}
