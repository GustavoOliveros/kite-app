<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Genre;
use Illuminate\Support\Facades\File;
use Database\Seeders\Title_Has_GenreTableSeeder;

class GenreTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = base_path('database/seeders/data/genres.json');
        $json = File::get($jsonPath);

        $data = json_decode($json, true);

        foreach($data['genres'] as $genre){
            Genre::create([
                "id" => $genre['id'],
                "name" => $genre['name']
            ]);
        }

        $this->call(Title_Has_GenreTableSeeder::class);
    }
}
