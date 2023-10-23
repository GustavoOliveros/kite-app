<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Title;
use Inertia\Inertia;
use App\Models\User_Has_Title;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\User_Views_Genre;
use App\Models\User_Views_Title;
use Exception;
use Illuminate\Support\Facades\DB;

class TitleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $titles = Title::all();

        return Inertia::render('Dashboard/Titles', ['titles' => $titles]);
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
        $title = Title::find($id);

        if($title){
            $userServices = User::find(Auth::user()->id)->services->pluck('service_id')->toArray();
            
            $titleOnServices = $title->services;
            $services = [];
            $array = [];
            $alreadySaved = false;
            
            foreach($titleOnServices as $titleOnService){
                $array['service'] = $titleOnService->service;
                $array['title_on_service'] = $titleOnService;
                $array['isUserSubscribed'] = in_array($titleOnService->service->id, $userServices);
                array_push($services, $array);
            }
    
            if($title){
                $userTitle = User_Has_Title::
                                where('user_id', Auth::user()->id)
                                ->where('title_id', $id)->first();
                $alreadySaved = ($userTitle) ? true : false;
    
                return Inertia::render('Title/Title', ['title' => $title, 'services' => $services, 'alreadySaved' => $alreadySaved]);
            }
        }

        return Inertia::render('Errors/Error', ['status' => 404]);
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

    /**
     * Returns the 10 most popular titles
     */
    public function popular(){
        $response = Title::take(10)->get();

        return response()->json($response);
    }

    public function saveHistory(string $id){
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
