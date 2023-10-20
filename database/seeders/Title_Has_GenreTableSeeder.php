<?php

namespace Database\Seeders;

use App\Models\Title_Has_Genre;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class Title_Has_GenreTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = base_path('database/seeders/data/titles.json');
        $json = File::get($jsonPath);

        $data = json_decode($json, true);

        foreach($data['results'] as $title){
            foreach($title['genre_ids'] as $genre){
                Title_Has_Genre::create([
                    'genre_id' => $genre,
                    'title_id' => $title['id'],
                ]);
            }
        }
    }
}
