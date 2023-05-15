<?php

namespace App\Http\Controllers\Api\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Catalog\OneClickBuyStoreRequest;
use App\Models\OneClickForm;

class OneClickBuyStoreController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(OneClickBuyStoreRequest $request)
    {
        OneClickForm::create($request->validated());

        return ["message" => "form send"];
    }
}
