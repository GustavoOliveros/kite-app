<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // 1 out of 10 users will be disabled.
        $disabled = rand(1, 10) === 1 ? now() : null;
        $reason = $disabled ? 'Baneo de prueba' : null;

        return [
            'username' => fake()->unique()->userName(),
            'email' => fake()->unique()->safeEmail(),
            'password' => '$2y$10$VGxO7Ga0wiRabn3uPdJ.EOOLB.zi7lmW9bfsefUggId6kUX3A4Esu', // password
            'profile_path' => null,
            'disabled_at' => $disabled,
            'reason' => $reason,
            'email_verified_at' => now(),
            
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
