<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateMessageRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'required|min:2|max:255',
            'message' => 'required|min:8|max:255',
            'email' => 'required|email:rfc,dns'
        ];
    }
}
