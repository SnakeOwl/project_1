<?php
namespace App\Http\Requests\Order;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|max:255|min:2',
            'payment_method' => 'required|max:255|min:2',
            'delivery_method' => 'required|max:255|min:2',
            'phone' => 'required|max:255|min:2',

            'email' => 'nullable|email:rfc,dns',
            'address' => 'nullable|max:255|min:2',
            'post_index' => 'nullable|max:255|min:2',
            'storage_id' => 'nullable|exists:storages,id',
        ];
    }
}
