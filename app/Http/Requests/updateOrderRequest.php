<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class updateOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->user()->can('update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'phone' => 'nullable',
            'delivery_method' => 'required',
            'address' => 'nullable'
            'post_index' => 'nullable'
            'status' => 'required'
        ];
    }
}
