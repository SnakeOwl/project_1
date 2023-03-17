<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Parameter>
 */
class ParameterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'param_name' => Str::random(32),
            'param_value' => Str::random(16),
            'param_name_en' => Str::random(32),
            'param_value_en' => Str::random(16)
        ];
    }
}
