<?php

namespace App\Http\Requests\Catalog;

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
            'priceFrom' => 'numeric|min:0',
            'priceTo' => 'numeric|min:0',
            'options' => 'array',
            'isNew' => 'nullable|string|max:5',
            'isPopular' => 'nullable|string|max:5',
        ];
    }
}
