<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User_Views_Title;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User_Views_Title>
 */
class User_Views_TitleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = fake()->dateTimeThisYear();

        do{
            $titleId = fake()->numberBetween(1, 39);
            $userId = fake()->numberBetween(1, 14);
            $serviceId = fake()->numberBetween(1, 6);

            $userTitle = User_Views_Title::where('title_id', $titleId)
                ->where('user_id', $userId)
                ->where('service_id', $serviceId)
                ->first();

        }while($userTitle);

        return [
            'title_id' => $titleId,
            'user_id' => $userId,
            'service_id' => $serviceId,
            'view_count' => fake()->numberBetween(1, 10),
            'created_at' => $date,
            'updated_at' => $date,
        ];
    }
}
