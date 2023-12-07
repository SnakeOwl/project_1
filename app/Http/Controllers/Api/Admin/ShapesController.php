<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreShapeRequest;
use App\Http\Requests\UpdateShapeRequest;
use App\Models\Shape;
use App\Models\Category;

class ShapesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Category $category)
    {
        return $category->shapes->load("shapeOptions");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShapeRequest $request, Category $category)
    {
        $category->shapes()->create($request->validated());
        return response("", 204);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category, Shape $shape)
    {
        return $shape->load("shapeOptions");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShapeRequest $request, Category $category, Shape $shape)
    {
        $shape->update($request->validated());
        return response("", 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category, Shape $shape)
    {
        foreach($shape->shapeOptions as $option)
        {
            foreach ($option->offers as $offer)
                $option->offers()->detach($offer);

            $option->delete();
        }
        
        $shape->delete();
        
        return response("", 204);
    }
}
