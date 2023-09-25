<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\TitleTableSeeder;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User factory

        \App\Models\User::factory(10)->create(); // Creating 10 users

        \App\Models\User::factory()->create([  // Creating Gus (11th user)
            'name' => 'Gus',
            'username' => 'Gus',
            'email' => 'gusa05@gmail.com',
            'disabled_at' => null,
            'reason' => null
        ]);

        // Title seeder
        $this->call(TitleTableSeeder::class);

    }
}
