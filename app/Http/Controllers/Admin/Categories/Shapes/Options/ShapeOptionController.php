<?php
namespace App\Http\Controllers\Admin\Categories\Shapes\Options;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ShapeOptions\ShapeOptionRequest;
use App\Models\ShapeOption;

class ShapeOptionController extends Controller
{
    public function store(ShapeOptionRequest $request)
    {
        ShapeOption::create($request->safe()->all());

        session()->flash('message', __('option has added'));
    }

    public function update(ShapeOptionRequest $request, ShapeOption $shapeOption)
    {
        $shapeOption->update($request->safe()->all());

        session()->flash('message',  __('option has updated'));
    }


    public function destroy(ShapeOption $shapeOption)
    {
        foreach ($shapeOption->offers as $offer)
            $shapeOption->offers()->detach($offer);

        $shapeOption->delete();

        session()->flash('message', __('option has destroyed'));
    }
}
