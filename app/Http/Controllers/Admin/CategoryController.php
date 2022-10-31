<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\Admin\CreateCategoryRequest;
use App\Http\Requests\Admin\UpdateCategoryRequest;
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
        return Inertia::render('Admin/Category/Form',);
    }

    public function store(CreateCategoryRequest $request)
    {
        Category::create($request->safe()->all());

        session()->flash('message', 'Категория добавлена');

        return redirect()->route('item-categories.index');
    }

    public function show(Category $item_category)
    {
        return Inertia::render('Admin/Category/Show', compact('item_category'));
    }

    public function edit(Category $item_category)
    {
        return Inertia::render('Admin/Category/Form', compact('item_category'));
    }

    public function update(UpdateCategoryRequest $request, Category $item_category)
    {
        $item_category->update($request->safe()->all());

        session()->flash('message', 'Категория изменена.');

        return redirect()->route('item-categories.index');
    }

    public function destroy(Category $item_category)
    {
        $item_category->delete();

        session()->flash('message', 'Категория удалена.');

        return redirect()->route('item-categories.index');
    }
}
