<?php

namespace App\Http\Requests\Admin\Shapes;

use Illuminate\Foundation\Http\FormRequest;

class ShapeRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user()->can('update');
    }

    public function rules()
    {
        return [
            'category_id' => 'nullable|numeric',
            'name' => 'required|max:255|min:2',
            'name_en' => 'required|max:255|min:2',
            'global' => 'required|boolean',
        ];
    }
}
