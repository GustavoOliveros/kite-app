<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index(){
        return Inertia::render('Dashboard/Analytics');
    }

    public function perform(Request $request){
        return response()->json(['message' => 'test']);
    }
}
