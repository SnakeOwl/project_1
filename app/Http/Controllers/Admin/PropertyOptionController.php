<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PropertyOption;
use App\Models\Property;
use Illuminate\Http\Request;
use App\Http\Requests\PropertyOptionRequest;


class PropertyOptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Models\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function index(Property $property)
    {
        $propertyOptions = $property->options()->paginate(25);
        return view('admin.property_options.index', compact('propertyOptions', 'property'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \App\Models\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function create(Property $property)
    {
        return view('admin.property_options.form', compact('property'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Property  $property
     * @return \Illuminate\Http\Response
     */
    public function store(PropertyOptionRequest $request, Property $property)
    {
        $params = $request->all();
        $params['property_id'] = $property->id;
        PropertyOption::create($params);
        session()->flash('info', 'Вариант свойства добавлен');

        return redirect()->route("properties.property-options.index", $property);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Property  $property
     * @param  \App\Models\PropertyOption  $propertyOption
     * @return \Illuminate\Http\Response
     */
    public function show(Property $property, PropertyOption $propertyOption)
    {
        return view('admin.property_options.show', compact('property', 'propertyOption'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Property  $property
     * @param  \App\Models\PropertyOption  $propertyOption
     * @return \Illuminate\Http\Response
     */
    public function edit(Property $property, PropertyOption $propertyOption)
    {
        return view('admin.property_options.form', compact('property', 'propertyOption'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Property  $property
     * @param  \App\Models\PropertyOption  $propertyOption
     * @return \Illuminate\Http\Response
     */
    public function update(PropertyOptionRequest $request, Property $property, PropertyOption $propertyOption)
    {
        $propertyOption->update($request->all());
        session()->flash('info', 'Вариант свойства добавлен');

        return redirect()->route("properties.property-options.index", $property);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Property  $property
     * @param  \App\Models\PropertyOption  $propertyOption
     * @return \Illuminate\Http\Response
     */
    public function destroy(Property $property, PropertyOption $propertyOption)
    {
        $propertyOption->delete();
        session()->flash('info', 'Вариант свойства удален');

        return redirect()->route("properties.property-options.index", $property);
    }
}
