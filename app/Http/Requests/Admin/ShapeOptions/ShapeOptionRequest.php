<?php

namespace App\Http\Requests\Admin\ShapeOptions;

use Illuminate\Foundation\Http\FormRequest;

class ShapeOptionRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user()->can('update');
    }

    public function rules()
    {
        return [
            'shape_id' => 'nullable|numeric',
            'value' => 'required|max:255|min:2',
            'value_en' => 'required|max:255|min:2',
        ];
    }
}
