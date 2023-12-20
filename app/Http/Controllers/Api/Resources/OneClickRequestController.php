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
    public function show(OneClickForm $oneClickForm)
    {
        return $$oneClickForm;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOneClickFormRequest $request, OneClickForm $oneClickForm)
    {
        $oneClickForm->update($request->validated());
        return response("", 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OneClickForm $oneClickForm)
    {
        $oneClickForm->delete();
        return response("", 204);
    }
}
