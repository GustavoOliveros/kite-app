<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Genre;
use App\Models\Title_Has_Genre;
use Inertia\Inertia;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $titles = [];
        $genre = Genre::find($id);

        if(!$genre){
            return Inertia::render('Errors/Error', ['status' => 404]);
        }

        $titleGenres = Title_Has_Genre::where('genre_id', $id)->orderBy('created_at', 'desc')->get();

        if($titleGenres){
            foreach($titleGenres as $titleGenre){
                $title = $titleGenre->title;
                if($title->status === 1){
                    array_push($titles, $title);
                }
            }
        }

        return Inertia::render('Genre/Genre', ['titles' => $titles, 'genre' => $genre]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
