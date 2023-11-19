<?php

namespace App\Http\Requests\Api\Partner;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class UpdateItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(Request $request): bool
    {
        $user = $request->user();
        $item = $request->route("item");

        // Если предмет принадлежит не этому пользоватею
        if ($user->items()->find($item) === null)
            return false;

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
            "category_id" => "required|exists:categories,id",
            "description" => "required|string",
            "description_en" => "required|string",

            "parameters" => "nullable|array",
        ];
    }
}
