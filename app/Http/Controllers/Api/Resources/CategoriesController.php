<?php

namespace App\Http\Controllers\Api\Resources;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Category::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Category::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return $category->load("shapes");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $category->update($request->all());

        return response("", 204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        foreach ($category->shapes as $shape)
        {
            foreach($shape->shapeOptions as $option)
            {
                foreach ($option->offers as $offer)
                    $option->offers()->detach($offer);

                $option->delete();
            }
            $shape->delete();
        }
        
        $category->delete();

        return response("", 204);   
    }
}
