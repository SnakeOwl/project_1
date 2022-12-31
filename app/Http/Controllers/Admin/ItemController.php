<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\CreateItemRequest;
use App\Http\Requests\Admin\UpdateItemRequest;
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
        $items = Item::with('skus')->paginate(25);

        return Inertia::render('Admin/Item/Index', compact('items'));
    }


    public function create()
    {
        $categories = Category::get();
        $skuProperties = Property::get();

        return Inertia::render('Admin/Item/Form',
            compact('skuProperties', 'categories'));
    }


    public function store(CreateItemRequest $request)
    {
        (new Item())->customCreate($request->safe());

        session()->flash('message', 'Товар добавлен');

        return redirect()->route('items.index');
    }


    public function show(Item $item)
    {
        return Inertia::render('Admin/Item/Show', compact('item'));
    }


    public function edit(Item $item)
    {
        $itemSkuProperties = $item->properties()->allRelatedIds();
        $itemParameters = $item->getParametersSimpleFormat();
        $itemGalery = $item->images;
        $categories = Category::get();
        $skuProperties = Property::get();

        return Inertia::render('Admin/Item/Form', compact(
            'item', 'skuProperties', 'categories',
            'itemSkuProperties', 'itemParameters', 'itemGalery'));
    }


    public function update(UpdateItemRequest $request, Item $item)
    {
        $item->customUpdate($request->safe());
        session()->flash('message', 'Товар изменен');

        return redirect()->back();
    }


    public function destroy(Item $item)
    {
        // $item->skus()->delete();
        $item->delete();
        session()->flash('message', 'Товар и его товарные предложения были удалены');

        return redirect()->back();
    }
}
