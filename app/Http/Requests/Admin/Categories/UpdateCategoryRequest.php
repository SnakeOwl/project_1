<?php
namespace App\Http\Requests\Admin\Categories;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user()->can('update');
    }

    public function rules()
    {
        return [
            'name' => 'required|min:3|max:255',
            'name_en' => 'nullable|min:3|max:255',
            'alias' => 'required|min:3|max:255'
        ];
    }
}
