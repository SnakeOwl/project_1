<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Shape;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ShapeOption>
 */
class ShapeOptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $value = Str::random(16);
        return [
            'shape_id'   => Shape::factory(),
            'value'      => $value,
            'value_en'   => $value,
        ];
    }
}
