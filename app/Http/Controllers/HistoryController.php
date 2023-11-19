<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use App\Models\Title;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\User_Views_Genre;
use App\Models\User_Views_Title;
use Exception;
use Illuminate\Support\Facades\DB;

class HistoryController extends Controller
{
    /**
     * Shows the user watch history
     */
    public function show(){
        $titles = [];

        $userTitles = User_Views_Title::with('title')->where('user_id', Auth::user()->id)->orderBy('updated_at', 'desc')->get();

        if($userTitles){
            foreach($userTitles as $userTitle){
                array_push($titles, $userTitle->title);
            }
        }

        return Inertia::render('History/History', ['titles' => $titles]);
    }


    /**
     * Updates the watch history of the auth user. Returns a JSON response
     * @param string $id (Title ID)
     */
    public function saveHistory(string $id, string $service_id){
        $response = [];

        try{
            DB::beginTransaction();
            $user = User::findOrFail(Auth::user()->id);
            $title = Title::findOrFail($id);
            $titleGenres = $title->genres;

            // Saving viewing history (genres)
            foreach($titleGenres as $titleGenre){
                $userGenre = User_Views_Genre::
                                where('user_id', $user->id)
                                ->where('genre_id', $titleGenre->genre_id)
                                ->first();

                if(!$userGenre){
                    // if the user has not seen the genre before, we have to create a new User_Views_Genre
                    $userGenre = new User_Views_Genre();
                    $userGenre->user()->associate($user);
                    $userGenre->genre()->associate($titleGenre->genre);
                    $userGenre->view_count = 1;
                    $userGenre->save();
                }else{
                    $userGenre->view_count++;
                    $userGenre->save();
                }
            }

            // Saving viewing history (titles)
            $userTitle = User_Views_Title::
                            where('user_id', $user->id)
                            ->where('title_id', $title->id)
                            ->first();

            if(!$userTitle){
                // if the user has not seen the title before, we have to create a new User_Views_Title
                $userTitle = new User_Views_Title();

                $service = Service::where('id_name', $service_id)->first();
                $userTitle->service()->associate($service);
                $userTitle->user()->associate($user);
                $userTitle->title()->associate($title);
                $userTitle->view_count = 1;
                $userTitle->save();
            }else{
                $userTitle->view_count++;
                $userTitle->save();
            }

            $response['type'] = 'success';
            $response['message'] = 'Redireccionando...';
            DB::commit();
        }catch(Exception $error){
            DB::rollBack();
            $response['type'] = 'error';
            $response['message'] = 'Ocurrió un error al guardar el historial.';
            $response['obj'] = $error;
        }

        return response()->json($response);
    }
}
