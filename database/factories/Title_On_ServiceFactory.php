<?php

namespace Database\Factories;

use App\Models\Title_On_Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Title_On_Service>
 */
class Title_On_ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        do{
            $titleId = fake()->numberBetween(1, 39);
            $serviceId = fake()->numberBetween(1, 6);

            $titleService = Title_On_Service::where('title_id', $titleId)
                ->where('service_id', $serviceId)
                ->first();

        }while($titleService !== null);

        return [
            'service_id' => $serviceId,
            'title_id' => $titleId,
            'quality' => 'HD',
            'link' => 'https://example.com/',
        ];
    }
}
