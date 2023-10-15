<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User_Has_Title;

class LibraryController extends Controller
{
    public function show(){
        $userTitles = $this->getUserTitles();

        return Inertia::render('Library/Library', ["titles" => $userTitles]);
    }

    public function store(Request $request){
        
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
