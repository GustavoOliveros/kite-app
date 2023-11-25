<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Title;
use Inertia\Inertia;
use App\Models\Genre;
use App\Models\Service;
use App\Models\User_Has_Service;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
    public function show(){
        $genres = Genre::all();
        $services = Service::all();

        $genresMapped = $genres->map(function($genre) {
            return [
                'value' => $genre->id,
                'label' => $genre->name
            ];
        });

        $servicesMapped = $services->map(function ($service) {
            return [
                'value' => $service->id,
                'label' => $service->name,
            ];
        });

        return Inertia::render('Search/Search', ['genres' => $genresMapped, 'services' => $servicesMapped]);
    }


    // Makes a search
    public function perform(Request $request){
        $response = [];
        $selectedServices = [];

        if(!empty($request->input('selectedServices'))){
            $selectedServices = array_map(function ($service){
                return $service['value'];
            }, $request->input('selectedServices'));
        }else{
            $selectedServices = User_Has_Service::where('user_id', Auth::user()->id)->get()->pluck('service_id');
        }

        $response = Title::where(function ($query) use ($request, $selectedServices) {
            $query->where('status', 1);

            if (!empty($request->input('formData')['query'])) {
                $query->where(function ($subquery) use ($request) {
                    $subquery->where('title', 'LIKE', '%' . $request->input('formData')['query'] . '%')
                            ->orWhere('original_title', 'LIKE', '%' . $request->input('formData')['query'] . '%');
                });
            }
            
            if (!empty($request->input('formData')['yearFrom'])) {
                $query->where('year', '>=', $request->input('formData')['yearFrom']);
            }
        
            if (!empty($request->input('formData')['yearUntil'])) {
                $query->where('year', '<=', $request->input('formData')['yearUntil']);
            }
        
            if (!empty($request->input('formData')['reviewFrom'])) {
                $query->where('rating', '>=', $request->input('formData')['reviewFrom']);
            }
        
            if (!empty($request->input('formData')['reviewUntil'])) {
                $query->where('rating', '<=', $request->input('formData')['reviewUntil']);
            }

            if (!empty($request->input('selectedType'))) {
                $query->where('type', '=', $request->input('selectedType')['value']);
            }
        
            if (!empty($request->input('selectedGenres'))) {
                $genreValues = array_map(function ($genre) {
                    return $genre['value'];
                }, $request->input('selectedGenres'));
        
                foreach($genreValues as $genreValue){
                    $query->whereHas('genres', function ($innerQuery) use ($genreValue) {
                        $innerQuery->where('genre_id', $genreValue);
                    });
                }
            }

            if ($selectedServices) {
                $query->where(function ($innerQuery) use ($selectedServices) {
                    foreach ($selectedServices as $selectedService) {
                        $innerQuery->orWhereHas('services', function ($serviceQuery) use ($selectedService) {
                            $serviceQuery->where('service_id', $selectedService);
                        });
                    }
                });
            }
        })->get();
        
        
        

        return response()->json($response);
    }
}
