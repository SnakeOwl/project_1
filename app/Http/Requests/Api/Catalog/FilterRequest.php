<?php

namespace App\Http\Requests\Api\Catalog;

use Illuminate\Foundation\Http\FormRequest;

class FilterRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            "category_alias" => "nullable|exists:categories,alias",
            'options' => 'nullable|array',
        ];
    }
}
