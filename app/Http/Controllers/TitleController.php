<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Title;
use Inertia\Inertia;
use App\Models\User_Has_Title;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

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
        // ESTO TENDRIA QUE RETORNAR TMB UN BOOLEAN PARA SABER SI EL USUARIO TIENE CONTRATADO EL SERVICIO
        $title = Title::find($id);
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
}
