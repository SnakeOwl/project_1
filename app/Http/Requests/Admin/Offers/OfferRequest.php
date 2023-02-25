<?php

namespace App\Http\Requests\Admin\Offers;

use Illuminate\Foundation\Http\FormRequest;

class OfferRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user()->can('update');
    }

    public function rules()
    {
        return [
            'item_id' => 'required|numeric|min:1',
            'count' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:1',
            'shapeOptions' => 'nullable|array',
            'galery' => 'nullable|array',
            'newGaleryImages' => 'nullable|array',
            'shortImage' => 'nullable|file',
        ];
    }
}
