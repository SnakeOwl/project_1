<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class SkuRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user()->can('update');
    }

    public function rules()
    {
        return [
            'count' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:1',
            'skuProperties' => 'nullable|array',
        ];
    }
}
