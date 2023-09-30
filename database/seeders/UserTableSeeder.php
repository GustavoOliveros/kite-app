<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // User factory

        \App\Models\User::factory(10)->create(); // Creating 10 users

        \App\Models\User::factory()->create([ 
            'name' => 'Gus',
            'username' => 'Gus',
            'email' => 'gusa05@gmail.com',
            'disabled_at' => null,
            'reason' => null
        ]);
        \App\Models\User::factory()->create([
            'name' => 'admin',
            'username' => 'admin',
            'email' => 'admin@gmail.com',
            'disabled_at' => null,
            'reason' => null
        ]);
        \App\Models\User::factory()->create([
            'name' => 'moderator',
            'username' => 'moderator',
            'email' => 'moderator@gmail.com',
            'disabled_at' => null,
            'reason' => null
        ]);
        \App\Models\User::factory()->create([
            'name' => 'user',
            'username' => 'user',
            'email' => 'user@gmail.com',
            'disabled_at' => null,
            'reason' => null
        ]);

        // Assign roles to test users
        $user =  \App\Models\User::where('username', 'user')->first();
        $admin = \App\Models\User::where('username', 'admin')->first();
        $moderator = \App\Models\User::where('username', 'moderator')->first();
        $gus =  \App\Models\User::where('username', 'gus')->first();

        $user->assignRole('user');
        $gus->assignRole('admin');
        $admin->assignRole('admin');
        $moderator->assignRole('moderator');
    }
}
