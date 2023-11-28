<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::all();

        return Inertia::render('Home/ServiceChoice', ["serviceData" => $services]);
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
    public function show(string $id_name)
    {
        $service = Service::where('id_name', $id_name)->first();

        if (!$service) {
            return Inertia::render('Errors/Error', ['status' => 404]);
        }

        $titles = $service->titles()
            ->orderByDesc('titles.created_at')
            ->select('titles.id', 'titles.title', 'titles.poster_path', 'titles.type', 'titles.backdrop_path', 'titles.year', 'titles.created_at')
            ->distinct('titles.id')
            ->get();

        return Inertia::render('Service/Service', ['service' => $service, 'titles' => $titles]);
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
