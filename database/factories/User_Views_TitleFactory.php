<?php

namespace Database\Factories;

use App\Models\Title;
use App\Models\User_Views_Genre;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User_Views_Title;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User_Views_Title>
 */
class User_Views_TitleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $date = fake()->dateTimeThisMonth();
        $viewCount = fake()->numberBetween(1, 10);
        

        do{
            $titleId = fake()->numberBetween(1, 39);
            $userId = fake()->numberBetween(1, 14);
            $serviceId = fake()->numberBetween(1, 6);

            $userTitle = User_Views_Title::where('title_id', $titleId)
                ->where('user_id', $userId)
                ->where('service_id', $serviceId)
                ->first();

        }while($userTitle !== null);

        $title = Title::find($titleId);
        $user = User::find($userId);
        $genres = $title->genresDirect;

        foreach($genres as $genre){
            $userGenre = User_Views_Genre::where('genre_id', $genre->id)->where('user_id', $userId)->first();

            if($userGenre){
                $userGenre->view_count += $viewCount;
                $userGenre->save();
            }else{
                $userGenre = new User_Views_Genre();
                $userGenre->genre()->associate($genre);
                $userGenre->view_count = $viewCount;
                $userGenre->user()->associate($user);
                $userGenre->save();
            }
        }



        return [
            'title_id' => $titleId,
            'user_id' => $userId,
            'service_id' => $serviceId,
            'view_count' => $viewCount,
            'created_at' => $date,
            'updated_at' => $date,
        ];
    }
}
