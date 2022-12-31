<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\TestRequest;

class TestController extends Controller
{
    public function __invoke(TestRequest $request)
    {
        echo __('testlang');
        // dd($request->validated());
    }
}
