<?php

namespace App\Http\Requests\Api\Catalog;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            "name" => "required|string",
        ];
    }
}
