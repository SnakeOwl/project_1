<?php

namespace App\Http\Requests\Api\Partner\Offers;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class DestroyOfferRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(Request $request): bool
    {
        $user = $request->user();
        $item = $request->route("item");

        // Если Item принадлежит не этому пользоватею
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
            //
        ];
    }
}
