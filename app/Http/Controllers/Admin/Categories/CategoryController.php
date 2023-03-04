<?php
namespace App\Http\Controllers\Admin\Categories;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\Admin\Categories\CreateCategoryRequest;
use App\Http\Requests\Admin\Categories\UpdateCategoryRequest;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::paginate(25);

        return Inertia::render('Admin/Category/Index', compact('categories'));
    }

    public function create()
    {
        return Inertia::render('Admin/Category/Create');
    }

    public function store(CreateCategoryRequest $request)
    {
        Category::create($request->safe()->all());

        session()->flash('message', __("category has added"));

        return redirect()->route('categories.index');
    }

    public function show(Category $category)
    {
        return Inertia::render('Admin/Category/Show', compact('category'));
    }

    public function edit(Category $category)
    {
        $category->load('shapes.shapeOptions');

        return Inertia::render('Admin/Category/Edit', compact('category'));
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->safe()->all());

        session()->flash('message', __("category has changed"));

        return redirect()->route('categories.index');
    }

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



        session()->flash('message', __("category has removed"));

        return redirect()->route('categories.index');
    }
}
