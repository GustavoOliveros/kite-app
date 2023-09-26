<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Service;

class ServiceTableSeeder extends Seeder
{
     /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = base_path('database/seeders/data/services.json');
        $json = File::get($jsonPath);

        $data = json_decode($json, true);

        foreach($data['results'] as $service){
            Service::create([
                "name" => $service['name'],
                "id_name" => $service['id'],
                "homepage" => $service['homePage'],
                "logo_path" => $service['images']['darkThemeImage'],
                "price" => 0,
            ]);
        }
    }
}
