<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CreateItemRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user()->can('update');
    }

    public function rules()
    {
        return [
            'name' => "required|max:255|unique:items",
            'name_en' => "required|max:255|unique:items",
            'description' => "required|string",
            'description_en' => "required|string",
            "category_id" => "required|numeric|min:1",
            'shortImage' => 'nullable|file',
            'hit' => 'boolean',
            'new' => 'boolean',
            'itemSkuProperties' => 'required|array',
            'newItemGalery' => 'nullable|array',
            'itemParameters' => 'nullable|array',
            'itemGalery' => 'nullable|array',
        ];
    }
}
