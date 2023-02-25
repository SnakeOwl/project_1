<?php
namespace App\Http\Requests\Admin\Categories;

use Illuminate\Foundation\Http\FormRequest;

class CreateCategoryRequest extends FormRequest
{
    public function authorize()
    {
        return $this->user()->can('update');
    }

    public function rules()
    {
        return [
            'name' => 'required|min:3|max:255|unique:categories',
            'name_en' => 'nullable|min:3|max:255|unique:categories',
            'alias' => 'required|min:3|max:255|unique:categories'
        ];
    }
}
