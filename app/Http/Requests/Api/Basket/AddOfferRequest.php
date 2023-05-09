<?php

namespace App\Http\Requests\Api\Basket;

use Illuminate\Foundation\Http\FormRequest;

class AddOfferRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'key' => 'nullable|string|exists:baskets,key'
        ];
    }
}
