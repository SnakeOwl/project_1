<?php

namespace App\Http\Controllers\Api\Resources;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOneClickFormRequest;
use App\Http\Requests\UpdateOneClickFormRequest;
use App\Models\OneClickForm;

class OneClickRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return OneClickForm::paginate(15);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOneClickFormRequest $request)
    {
        OneClickForm::create($request->validated());
        return response("", 204);
    }

    /**
     * Display the specified resource.
     */
    public function show(OneClickForm $one_click_request)
    {
        return $one_click_request;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOneClickFormRequest $request, OneClickForm $one_click_request)
    {
        $one_click_request->update($request->validated());
        return response("", 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OneClickForm $one_click_request)
    {
        $one_click_request->delete();
        return response("", 204);
    }
}
