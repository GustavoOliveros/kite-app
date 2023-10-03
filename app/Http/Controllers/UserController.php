<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User_Has_Service;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Service;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();

        return Inertia::render('Dashboard/Users', ["users" => $users]);
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

    public function addServices(Request $request){
        $userObj = User::find(Auth::user()->id);
        $services = $request['services'];

        if(count($services) > 0){
            foreach($services as $service){
                $userHasService = new User_Has_Service();
                $userHasService->user()->associate($userObj);
                $serviceObj = Service::find($service);
                $userHasService->service()->associate($serviceObj);
                $userHasService->save();
            }
        }

        $userObj->assignRole('user');

        return redirect()->route('home');
    }

    public function userFilter($query){
        $response = [];

        $response = User::where('id', $query)->first();

        if(!$response){
            $response = User::where('username', 'LIKE', '%'.$query.'%')
                            ->orWhere('email', 'LIKE', '%'.$query.'%')
                            ->get();
        }
        
        return response()->json($response);
    }
}
