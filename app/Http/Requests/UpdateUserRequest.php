<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user()->can('update');
    }

    public function rules()
    {
        return [
            'name' => 'required|min:3|max:255',
            'phone' => 'required|min:4|max:255',
            'email' => 'required|email:rfc,dns',
            'password' => 'nullable|min:8|max:32'
        ];
    }
}
