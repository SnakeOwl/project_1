<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shape;
use App\Models\Category;

class ShapesController extends Controller
{
    public function index(Category $category)
    {
        return $category->shapes->load("shapeOptions");
    }


    public function store(Request $request, Category $category)
    {
        $category->shapes()->create($request->all());
        return response("", 204);
    }


    public function show(Category $category, Shape $shape)
    {
        return $shape->load("shapeOptions");
    }


    public function update(Request $request, Category $category, Shape $shape)
    {
        $shape->update($request->all());
        return response("", 204);
    }


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
