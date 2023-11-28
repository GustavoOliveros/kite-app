<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User_Has_Service;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User_Has_Service>
 */
class User_Has_ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        do{
            $userId = fake()->numberBetween(1, 14);
            $serviceId = fake()->numberBetween(1, 6);

            $userTitle = User_Has_Service::where('user_id', $userId)
                ->where('service_id', $serviceId)
                ->first();

        }while($userTitle !== null);

        return [
            'user_id' => $userId,
            'service_id' => $serviceId,
        ];
    }
}
