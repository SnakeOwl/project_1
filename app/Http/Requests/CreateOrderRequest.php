<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateOrderRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'payment_method' => 'required|min:2|max:255',
            'delivery_method' => 'required|min:8|max:255',
            'address' => 'nullable|min:8|max:255',
            'post_index' => 'nullable|min:4|max:12',
            'storage_id' => 'nullable|numeric',
            'phone' => 'required|min:8|max:255',
            'name' => 'required|min:2|max:255',
            'email' => 'required|email:rfc,dns'
        ];
    }
}
