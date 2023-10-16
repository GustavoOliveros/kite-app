<?php

namespace App\Http\Controllers;

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
        $userTitles = $this->getUserTitles();

        return Inertia::render('Library/Library', ["titles" => $userTitles]);
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
                ->first();
 
            $userTitle->delete();

            $response['userTitle'] = $userTitle;
            $response['type'] = 'success';
            $response['message'] = 'Se ha eliminado con éxito de su biblioteca.';
        }catch(Exception $error){
            $response['type'] = 'error';
            $response['message'] = 'Ocurrió un error. Inténtelo de nuevo más tarde.';
            $response['obj'] = $error;
        }

        return $response;
    }

    public function getUserTitles($filter = 'newest'){
        $response = [];
        $filter = ($filter == 'newest') ? 'desc' : 'asc';

        $userTitles = User_Has_Title::
            where('user_id', Auth::user()->id)
            ->orderBy('created_at', $filter)
            ->with('title')
            ->get();

        if($userTitles && count($userTitles) > 0){
            foreach($userTitles as $userTitle){
                array_push($response, $userTitle['title']);
            }
        }

        return $response;
    }

    public function filterLibrary($filter){
        $response = $this->getUserTitles($filter);

        return response()->json($response);
    }
}
