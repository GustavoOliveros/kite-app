<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Title;
use Inertia\Inertia;
use App\Models\Genre;

class SearchController extends Controller
{
    public function show(){
        $genres = Genre::all();
        $response = [];

        if($genres){
            foreach($genres as $genre){
                $responseAux['label'] = $genre->name;
                $responseAux['value'] = $genre->id;
                array_push($response, $responseAux);
            }
        }

        return Inertia::render('Search/Search', ['genres' => $response]);
    }


    // Makes a search
    public function perform($query){
        $response = [];

        $response = Title::where('title', 'LIKE', '%'.$query.'%')
            ->orWhere('original_title', 'LIKE', '%'.$query.'%')
            ->get();


        return response()->json($response);
    }
}
