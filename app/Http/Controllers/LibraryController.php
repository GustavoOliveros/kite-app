<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User_Has_Title;
use App\Models\User;
use App\Models\Title;
use Exception;

class LibraryController extends Controller
{
    public function show(){
        $userTitles = $this->getUserLibrary();

        return Inertia::render('Library/Library', ["titles" => $userTitles, 'success' => session('success')]);
    }

    public function store(Request $request){
        $userTitle = new User_Has_Title();
        $response = [];

        try{
            $user = User::find(Auth::user()->id);
            $userTitle->user()->associate($user);

            $title = Title::find($request['id']);
            $userTitle->title()->associate($title);

            $userTitle->save();

            $response['type'] = 'success';
            $response['message'] = 'Se ha guardado con éxito.';
        }catch(Exception $error){
            $response['type'] = 'error';
            $response['message'] = 'Ocurrió un error. Inténtelo de nuevo más tarde.';
            $response['obj'] = $error;
        }

        return response()->json($response);
    }

    public function destroy($titleId){
        $response = [];

        try{
            $userTitle = User_Has_Title::where('user_id', Auth::user()->id)
                ->where('title_id', $titleId)
                ->firstOrFail();
 
            $userTitle->delete();

            $response['type'] = 'success';
            $response['message'] = 'Se ha eliminado con éxito de su biblioteca.';
        }catch(Exception $error){
            $response['type'] = 'error';
            $response['message'] = 'Ocurrió un error. Inténtelo de nuevo más tarde.';
            $response['obj'] = $error;
        }

        return response()->json($response);
    }

    public function getUserLibrary($filter = 'newest'){
        $response = [];

        $userTitles = User_Has_Title::
            where('user_id', Auth::user()->id)
            ->with('title')
            ->get();

        $playlists = Playlist::
            where('user_id', Auth::user()->id)
            ->get();

        if($userTitles && $playlists){
            $combined = $userTitles->concat($playlists);

            if($filter === 'newest'){
                $sorted = $combined->sortByDesc(function($element ) {
                    return $element->created_at;
                });
            }else{
                $sorted = $combined->sortBy(function($element ) {
                    return $element->created_at;
                });
            }

            foreach($sorted as $element){
                if(is_a($element, 'App\Models\User_Has_Title')){
                    if($element->title->status === 1){
                        array_push($response, $element->title);
                    }
                }else{
                    array_push($response, $element);
                }
            }
        }

        return $response;
    }

    static public function getUserTitles(){
        $response = [];

        $userTitles = User_Has_Title::
            where('user_id', Auth::user()->id)
            ->orderBy('created_at', 'desc')
            ->with('title')
            ->get();

        if($userTitles && count($userTitles) > 0){
            foreach($userTitles as $userTitle){
                if($userTitle['title']['status'] === 1){
                    array_push($response, $userTitle['title']);
                }
            }
        }

        return $response;
    }

    public function getUserPlaylists(){
        $response = [];

        $playlists = Playlist::
            where('user_id', Auth::user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        if($playlists){
            $response = $playlists;
        }

        return $response;
    }

    public function filterLibrary($filter){
        $response = [];

        if($filter == 'newest' || $filter == 'oldest'){
            $response = $this->getUserLibrary($filter);
        }elseif($filter == 'playlists'){
            $response = $this->getUserPlaylists();
        }else{
            $response = $this->getUserTitles();
        }

        return response()->json($response);
    }
}
