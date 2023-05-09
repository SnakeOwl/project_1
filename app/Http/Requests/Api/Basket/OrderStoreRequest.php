<?php

namespace App\Http\Requests\Api\Basket;

use Illuminate\Foundation\Http\FormRequest;

class OrderStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'key' => 'required|string|exists:baskets,key',

            'name' => 'required|max:255|min:2',
            'payment_method' => 'required|max:255|string',
            'delivery_method' => 'required|max:255|string',
            'phone' => 'required|max:255|string',

            'email' => 'nullable|email:rfc,dns',
            'address' => 'nullable|max:255|string',
            'post_index' => 'nullable|max:255|string',
            'storage_id' => 'nullable|exists:storages,id',
        ];
    }
}