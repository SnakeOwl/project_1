<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Models\OneClickForm;
use App\Http\Requests\Catalog\OneClickFormStoreRequest;

class OneClickFormStoreController extends Controller
{
    public function __invoke(OneClickFormStoreRequest $request)
    {
        OneClickForm::create($request->validated());
    }
}
