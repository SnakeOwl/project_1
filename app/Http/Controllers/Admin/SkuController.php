<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sku;
use App\Models\Item;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\SkuRequest;
use Inertia\Inertia;

class SkuController extends Controller
{
    public function index(Item $item)
    {
        $skus = $item->skus()->paginate(25);

        return Inertia::render('Admin/Item/Sku/Index', compact('skus', 'item'));
    }


    public function create(Item $item)
    {
        $item->properties = $item->properties()->with('options')->get();

        return Inertia::render('Admin/Item/Sku/Form', compact('item'));
    }


    public function store(SkuRequest $request, Item $item)
    {
        $sku = $item->skus()->create($request->safe()->all());
        $sku->propertyOptions()->sync($request->property_id);

        session()->flash('message', 'Торговое предложение было создано');

        return redirect()->route('items.skus.index', $item);
    }


    public function show(Item $item, Sku $sku)
    {
        return Inertia::render('Admin/Item/Sku/Show', compact('item', 'sku'));
    }


    public function edit(Item $item, Sku $sku)
    {
        $sku->propertyOptions;
        $item->properties = $item->properties()->with('options')->get();

        return Inertia::render('Admin/Item/Sku/Form', compact('item', 'sku'));
    }


    public function update(SkuRequest $request, Item $item, Sku $sku)
    {
        $sku->update($request->safe()->all());
        $sku->propertyOptions()->sync($request->property_id);

        session()->flash('message', 'Торговое предложение было изменено');

        return redirect()->route('items.skus.index', $item);
    }


    public function destroy(Item $item, Sku $sku)
    {
        $sku->delete();

        session()->flash('message', 'Торговое предложение было удалено');

        return redirect()->route('items.skus.index', $item);
    }
}
