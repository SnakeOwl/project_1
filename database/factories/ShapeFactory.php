<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shape>
 */
class ShapeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $name = Str::random(16);
        return [
            'category_id'   => Category::factory(),
            'name'          => $name,
            'name_en'       => $name,
            'global'        => 0,
        ];
    }
}
