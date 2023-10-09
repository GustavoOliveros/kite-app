<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Title;
use Inertia\Inertia;

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
        $titleOnServices = $title->services;
        $services = [];
        $array = [];

        foreach($titleOnServices as $titleOnService){
            $array['service'] = $titleOnService->service;
            $array['title_on_service'] = $titleOnService;
            array_push($services, $array);
        }

        if($title){
            return Inertia::render('Title/Title', ['title' => $title, 'services' => $services]);
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
