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
        $i = 1;

        $jsonPathMovie = base_path('database/seeders/data/titles.json');
        $jsonMovie = File::get($jsonPathMovie);
        $dataMovie = json_decode($jsonMovie, true);
        
        $jsonPathTV = base_path('database/seeders/data/titlesTV.json');
        $jsonTV = File::get($jsonPathTV);
        $dataTV = json_decode($jsonTV, true);
        
        // Combine data from both JSON files into a single array
        $combinedData = array_merge($dataMovie['results'], $dataTV['results']);
        
        foreach ($combinedData as $title) {
            foreach ($title['genre_ids'] as $genre) {
                Title_Has_Genre::create([
                    'genre_id' => $genre,
                    'title_id' => $i,
                ]);
            }
            $i++;
        }        
    }
}
