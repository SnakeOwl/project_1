<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Http\Requests\Admin\PropertyRequest;
use Inertia\Inertia;

class SkuPropertyController extends Controller
{
    public function index()
    {
        $properties = Property::paginate(25);

        return Inertia::render('Admin/SkuOption/Index', compact('properties'));
    }

    public function create()
    {
        return Inertia::render('Admin/SkuOption/Form');
    }

    public function store(PropertyRequest $request)
    {
        Property::create($request->safe()->all());

        session()->flash('message', 'Свойство добавлено');

        return redirect()->route("sku-properties.index");
    }

    public function show(Property $sku_property)
    {
        return Inertia::render('Admin/SkuOption/Show', compact('sku_property'));
    }

    public function edit(Property $sku_property)
    {
        return Inertia::render('Admin/SkuOption/Form', compact('sku_property'));
    }

    public function update(PropertyRequest $request, Property $sku_property)
    {
        $sku_property->update($request->safe()->all());

        session()->flash('message', 'Свойство зменено');

        return redirect()->route("sku-properties.index");
    }

    public function destroy(Property $sku_property)
    {
        $sku_property->delete();

        session()->flash('message', 'Свойство удалено');

        return redirect()->back();
    }
}
