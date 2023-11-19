<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Database\Seeders\TitleTableSeeder;
use Database\Seeders\ServiceTableSeeder;
use Database\Seeders\RolesAndPermissionsSeeder;
use Database\Seeders\UserTableSeeder;
use Database\Seeders\GenreTableSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RolesAndPermissionsSeeder::class);
        $this->call(UserTableSeeder::class);
        $this->call(TitleTableSeeder::class);
        $this->call(ServiceTableSeeder::class);
        $this->call(GenreTableSeeder::class);
        \App\Models\User_Views_Title::factory(100)->create();
        \App\Models\Review::factory(100)->create();
    }
}
