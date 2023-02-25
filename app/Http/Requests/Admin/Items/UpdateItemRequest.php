<?php

namespace App\Http\Requests\Admin\Items;

use Illuminate\Foundation\Http\FormRequest;

class UpdateItemRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user()->can('update');
    }

    public function rules()
    {
        return [
            'name' => "required|max:255",
            'name_en' => "required|max:255",
            'description' => "nullable|string",
            'description_en' => "nullable|string",
            "category_id" => "required|numeric|min:1",
            'parameters' => 'nullable|array',
        ];
    }
}
