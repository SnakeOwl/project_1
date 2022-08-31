<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sku;
use App\Models\Item;
use Illuminate\Http\Request;
use App\Http\Requests\SkuRequest;

class SkuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function index(Item $item)
    {
        $skus = $item->skus()->paginate(25);
        return view("admin.skus.index", compact('item', 'skus'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function create(Item $item)
    {
        return view("admin.skus.form", compact('item'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function store(SkuRequest $request, Item $item)
    {
        $params = $request->all();
        $params['item_id'] = $item->id;
        $sku = Sku::create($params);
        $sku->propertyOptions()->sync($request->property_id);
        session()->flash('info', 'Торговое предложение было создано');

        return redirect()->route('items.skus.index', $item);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @param  \App\Models\Sku  $sku
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item, Sku $sku)
    {
        return view('admin.skus.show', compact(['item', 'sku']));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @param  \App\Models\Sku  $sku
     * @return \Illuminate\Http\Response
     */
    public function edit(Item $item, Sku $sku)
    {
        return view('admin.skus.form', compact(['item', 'sku']));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Item  $item
     * @param  \App\Models\Sku  $sku
     * @return \Illuminate\Http\Response
     */
    public function update(SkuRequest $request, Item $item, Sku $sku)
    {
        $sku->update($request->all());
        $sku->propertyOptions()->sync($request->property_id);
        session()->flash('info', 'Торговое предложение было изменено');

        return redirect()->route('items.skus.index', $item);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Item  $item
     * @param  \App\Models\Sku  $sku
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item, Sku $sku)
    {
        $sku->delete();
        session()->flash('info', 'Торговое предложение было удалено');

        return redirect()->route('items.skus.index', $item);
    }
}
