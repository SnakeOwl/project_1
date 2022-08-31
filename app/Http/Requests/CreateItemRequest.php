<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => "required|max:255|unique:items",
            'name_en' => "nullable|max:255|unique:items",
            'description' => "required",
            'description_en' => "nullable",
            "discount" => "nullable|numeric",
            "category_id" => "required"
        ];
    }
}
