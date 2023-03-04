<?php
namespace App\Http\Controllers\Admin\Categories\Shapes;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Shapes\ShapeRequest;
use App\Models\Shape;

class ShapeController extends Controller
{
    public function store(ShapeRequest $request)
    {
        Shape::create($request->safe()->all());

        session()->flash('message', __('shape has added'));
    }

    public function update(ShapeRequest $request, Shape $shape)
    {
        $shape->update($request->safe()->all());

        session()->flash('message', __('shape has updated'));
    }

    public function destroy(Shape $shape)
    {
        foreach($shape->shapeOptions as $option)
        {
            foreach ($option->offers as $offer)
                $option->offers()->detach($offer);

            $option->delete();
        }
        
        $shape->delete();

        session()->flash('message', __('shape has destroyed'));
    }
}
