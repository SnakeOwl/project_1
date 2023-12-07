<?php

namespace App\Http\Requests\Api\Admin\Storages;

use Illuminate\Foundation\Http\FormRequest;

class StorageRequest extends FormRequest
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
            'phone' => 'nullable|max:255',
            'name' => 'required|max:255',
            'name_en' => 'required|max:255',
            'address' => 'required|max:255',
            'address_en' => 'required|max:255',
            'schedule' => 'required|max:255',
            'schedule_en' => 'required|max:255',
        ];
    }
}
