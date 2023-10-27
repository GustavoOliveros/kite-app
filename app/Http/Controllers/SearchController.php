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
    public function perform(Request $request){
        $response = [];

        $response = Title::where(function ($query) use ($request) {
            if(!empty($request->input('formData')['query'])){
                $query->where('title', 'LIKE', '%' . $request->input('formData')['query'] . '%')
                  ->orWhere('original_title', 'LIKE', '%' . $request->input('formData')['query'] . '%');
            }
        
            if (!empty($request->input('formData')['yearFrom'])) {
                $query->where('year', '>=', $request->input('formData')['yearFrom']);
            }
        
            if (!empty($request->input('formData')['yearUntil'])) {
                $query->where('year', '<=', $request->input('formData')['yearUntil']);
            }
        
            if (!empty($request->input('formData')['reviewFrom'])) {
                $query->where('rating', '>=', $request->input('formData')['reviewFrom']);
            }
        
            if (!empty($request->input('formData')['reviewUntil'])) {
                $query->where('rating', '<=', $request->input('formData')['reviewUntil']);
            }

            if (!empty($request->input('selectedType'))) {
                $query->where('type', '=', $request->input('selectedType')['value']);
            }
        
            if (!empty($request->input('selectedGenres'))) {
                $genreValues = array_map(function ($genre) {
                    return $genre['value'];
                }, $request->input('selectedGenres'));
        
                foreach($genreValues as $genreValue){
                    $query->whereHas('genres', function ($innerQuery) use ($genreValue) {
                        $innerQuery->where('genre_id', $genreValue);
                    });
                }
            }

            dd($query);
        })->get();
        
        
        

        return response()->json($response);
    }
}
