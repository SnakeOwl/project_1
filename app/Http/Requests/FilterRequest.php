<?php

namespace App\Http\Requests;

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
            'price_from' => 'nullable|numeric|min:1',
            'price_to' => 'nullable|numeric|min:1',
            'search' => 'nullable|max:255',
        ];
    }
}
