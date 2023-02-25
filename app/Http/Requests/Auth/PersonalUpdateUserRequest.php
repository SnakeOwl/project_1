<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class PersonalUpdateUserRequest extends FormRequest
{
    public function authorize()
    {
        // реквест уже проверяется на авторизованность пользователя через мидлвере
        return true;
    }

    public function rules()
    {
        return [
            "phone" => "nullable|string|max:12",
        ];
    }
}
