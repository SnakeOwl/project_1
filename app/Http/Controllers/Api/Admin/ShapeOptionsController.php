<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ShapeOption;
use App\Models\Shape;

class ShapeOptionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Shape $shape)
    {
        return $shape->options;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Shape $shape)
    {
        $shape->options()->create($request->all());
        return response("", 204);
    }

    /**
     * Display the specified resource.
     */
    public function show(Shape $shape, ShapeOption $options)
    {
        return $options;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Shape $shape, ShapeOption $option)
    {
        $option->update($request->all());
        return response("", 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shape $shape, ShapeOption $option)
    {
        $option->delete();
        return response("", 204);
    }
}
