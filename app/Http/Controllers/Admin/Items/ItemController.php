<?php
namespace App\Http\Controllers\Admin\Items;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Items\CreateItemRequest;
use App\Http\Requests\Admin\Items\UpdateItemRequest;
use App\Models\Item;
use App\Models\Parameter;
use App\Models\Galery;
use App\Models\Property;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::with('offers')->paginate(25);

        return Inertia::render('Admin/Item/Index', compact('items'));
    }


    public function create()
    {
        $categories = Category::get();
        if ($categories->count() == 0)
        {
            session()->flash('message', __('item has added'));

            return redirect()->route('categories.index');
        }

        return Inertia::render('Admin/Item/Form', compact('categories'));
    }


    public function store(CreateItemRequest $request)
    {
        (new Item)->customCreate($request->validated());

        session()->flash('message', __('item has added'));

        return redirect()->route('items.index');
    }


    public function show(Item $item)
    {
        return Inertia::render('Admin/Item/Show', compact('item'));
    }


    public function edit(Item $item)
    {
        $categories = Category::get();
        $item->load('parameters');

        return Inertia::render('Admin/Item/Form', compact(
            'item', 'categories'));
    }


    public function update(UpdateItemRequest $request, Item $item)
    {
        $item->customUpdate($request->validated());

        session()->flash('message', __('item has updated'));

        return redirect()->route('items.index');
    }


    public function destroy(Item $item)
    {
        $item->offers()->delete();
        $item->delete();

        session()->flash('message', __('item has destroyed'));
    }
}
