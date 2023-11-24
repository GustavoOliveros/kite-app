<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reminder;
use App\Models\Service;
use App\Models\Title;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Exception;
use Inertia\Inertia;

class ReminderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $reminders = Reminder::where('user_id', Auth::user()->id)->get();
        $user = User::find(Auth::user()->id);

        $titles = $user->titleReminder->unique('id')->values();

        return Inertia::render('UserReminders/UserReminders', ['titles' => $titles, 'deleteRoute' => 'reminder.destroy']);
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
    public function store(string $id)
    {
        $response = [];

        try{
            // user
            $user = User::find(Auth::user()->id);

            // title
            $title = Title::find($id);

            // services
            $services = $user->servicesDirect;

            foreach($services as $service){
                $reminder = new Reminder();
                $reminder->user()->associate($user);
                $reminder->service()->associate($service);
                $reminder->title()->associate($title);
                $reminder->save();
            }

            $response['type'] = "success";
            $response['message'] = "Recibiras notificaciones si el título llega a tus servicios contratados o cuando se estrene.";
        }catch(Exception $error){
            $response['type'] = 'error';
            $response['message'] = "Ocurrió un error. Inténtelo de nuevo más tarde";
            $response['obj'] = $error;
        }

        return response()->json($response);
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
        $response = [];

        try{
            Reminder::where('user_id', Auth::user()->id)->where('title_id', $id)->delete();

            $response['type'] = "success";
            $response['message'] = "Ya no recibiras notificaciones del título.";
        }catch(Exception $error){
            $response['type'] = 'error';
            $response['message'] = "Ocurrió un error. Inténtelo de nuevo más tarde";
            $response['obj'] = $error;
        }

        return response()->json($response);
    }

    public function all(){
        $user = User::find(Auth::user()->id);

        $titles = $user->titleReminder->unique('id')->values();

        return response()->json($titles);
    }
}
