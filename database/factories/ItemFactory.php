<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = Str::random(8);
        return [
            'category_id' => Category::factory(),
            "name" => $name,
            "name_en" => $name,
            "alias" => $name,
            "description" => "Это просто наполнение для демонстрации работы сайта",
            "description_en" => "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, nam.",
        ];
    }
}
