<?php

namespace App\Http\Controllers\Api\Resources;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
    public function store(Request $request)
    {
        OneClickForm::create($request->all());
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
    public function update(Request $request, OneClickForm $one_click_request)
    {
        $one_click_request->update($request->all());
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
