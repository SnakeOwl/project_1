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
        // при передаче get запроса нельзя определить значение boolean
        return [
            'category' => 'nullable|string|exists:categories,alias',
            'priceFrom' => 'nullable|numeric|min:0',
            'priceTo' => 'nullable|numeric|min:0',
            'options' => 'array',

        ];
    }
}
