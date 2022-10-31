<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PropertyOption;
use App\Models\Property;
use App\Http\Requests\Admin\PropertyOptionRequest;
use Inertia\Inertia;

class SkuPropertyOptionController extends Controller
{
    public function index(Property $sku_property)
    {
        $skuPropertyOptions = $sku_property->options()->paginate(25);

        return Inertia::render('Admin/SkuOption/OptionValues/Index',
            compact('skuPropertyOptions', 'sku_property'));
    }


    public function create(Property $sku_property)
    {
        return Inertia::render('Admin/SkuOption/OptionValues/Form',
            compact('sku_property'));
    }


    public function store(PropertyOptionRequest $request, Property $sku_property)
    {
        $sku_property->options()->create($request->all());

        session()->flash('message', 'Вариант свойства добавлен');

        return redirect()->route("sku-properties.property-options.index",
            $sku_property);
    }


    public function show(Property $sku_property, PropertyOption $property_option)
    {
        return Inertia::render('Admin/SkuOption/OptionValues/Show',
            compact('sku_property', 'property_option'));
    }


    public function edit(Property $sku_property, PropertyOption $property_option)
    {
        return Inertia::render('Admin/SkuOption/OptionValues/Form',
            compact('sku_property', 'property_option'));
    }


    public function update(PropertyOptionRequest $request,
                            Property $sku_property,
                            PropertyOption $property_option)
    {
        $property_option->update($request->all());

        session()->flash('message', 'Вариант свойства обновлен');

        return redirect()->route("sku-properties.property-options.index",
            $sku_property);
    }


    public function destroy(Property $sku_property, PropertyOption $property_option)
    {
        $property_option->delete();

        session()->flash('message', 'Вариант свойства удален');

        return redirect()->route("sku-properties.property-options.index",
            $sku_property);
    }
}
