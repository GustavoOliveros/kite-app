<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Title;
use Spatie\Permission\Models\Permission;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(Auth::check()){
            return redirect()->route('home');
        }

        $services = Service::all();

        return Inertia::render('LandingPage', ['services' => $services]);
    }

    public function indexHomepage(){
        //  check if user has services
        $user = User::where('id',Auth::user()->id)->first();
        $services = $user->services;
        $titles = Title::where('status', 1)->take(20)->get()->map(function ($title) {
            return [
                'id' => $title->id,
                'title' => $title->title,
                'poster_path' => $title->poster_path,
                'type' => $title->type
            ];
        });
        $servicesObjCol = [];
        
        foreach($services as $service){
            array_push($servicesObjCol, $service->service);
        }
        return Inertia::render('Home/Home', ['services' => $servicesObjCol, 'titles' => $titles]);
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
        //
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
