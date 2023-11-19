<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = fake()->dateTimeThisYear();

        return [
            'title_id' => fake()->numberBetween(1, 39),
            'user_id' => fake()->numberBetween(1, 14),
            'star_number' => fake()->numberBetween(1, 5),
            'review_text' => fake()->text(),
            'created_at' => $date,
            'updated_at' => $date,
        ];
    }
}
