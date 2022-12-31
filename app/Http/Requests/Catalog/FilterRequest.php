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
        return [
            'priceFrom' => 'numeric|min:0',
            'priceTo' => 'numeric|min:0',
            'categy' => 'numeric|min:1',
            'isNew' => 'string|max:5', // boolean не подходит
            'isPopular' => 'string|max:5', // boolean не подходит
        ];
    }
}
