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
            'options' => 'array',
        ];
    }
}
