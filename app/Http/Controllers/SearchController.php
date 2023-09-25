<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Title;

class SearchController extends Controller
{
    // Makes a search
    public function perform($query){
        $response = [];

        $response = Title::where('title', 'LIKE', '%'.$query.'%')
            ->orWhere('original_title', 'LIKE', '%'.$query.'%')
            ->get();


        return response()->json($response);
    }
}
