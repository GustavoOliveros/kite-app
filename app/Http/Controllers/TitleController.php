<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use App\Models\Title;
use Inertia\Inertia;
use App\Models\User_Has_Title;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Client\RequestException;
use App\Models\Title_On_Service;
use App\Http\Requests\TitleRequest;
use App\Notifications\ApprovalNotification;

class TitleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $titles = Title::orderBy('created_at', 'desc')->get();

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
    public function store(TitleRequest $request)
    {
        $response = [];

        try{
            DB::beginTransaction();
            // Create a new instance of the Title model
            $title = new Title();

            // Set the attributes based on the data in the request
            $title->id = $request->input('id');
            $title->type = $request->input('media_type');
            $title->title = $request->input('title') ?? $request->input('name');
            $title->original_title = $request->input('original_title') ?? $request->input('original_name');
            $title->year = $request->input('release_date') ? substr($request->input('release_date'), 0, 4) : substr($request->input('first_air_date'), 0, 4);
            $title->poster_path = $request->input('poster_path');
            $title->backdrop_path = $request->input('backdrop_path');
            $title->overview = $request->input('overview') ?? '';
            $title->status = 1;

            // Save the newly created resource to the database
            $title->save();

            // Attach the genres to the title
            $genreIds = $request->input('genre_ids');
            $title->genresDirect()->attach($genreIds);

            // Get streaming data
            $services = $this->getStreamingData($request->input('id'), $request->input('media_type'));
        
            // Attach streaming data
            if(isset($services['result']['streamingInfo']['ar']) && count($services['result']['streamingInfo']['ar']) > 0){
                $services = $services['result']['streamingInfo']['ar'];

                foreach($services as $service){
                    if($service['streamingType'] == 'subscription'){
                        $titleService = new Title_On_Service();

                        $title = Title::find($request->input('id'));
                        $titleService->title()->associate($title);
    
                        $localService = Service::where('id_name', $service['service'])->first();
                        $titleService->service()->associate($localService);
    
                        $titleService->link = $service['link'];

                        $titleService->quality = $service['quality'] ?? 'HD';
                        $titleService->available_since = isset($service['available_since']) ? date("Y-m-d H:i:s", $service['availableSince']) : null;
                        $titleService->leaving = isset($service['leaving']) && intval($service['leaving']) < 1919748376 ? date("Y-m-d H:i:s", $service['leaving']) : null;
                        $titleService->save();
                    }
                }
            }


            DB::commit();

            $response['type'] = 'success';
            $response['message'] = 'Se guardó con éxito.';
        }catch(Exception $error){
            DB::rollBack();
            $response['type'] = 'error';
            $response['message'] = 'Ocurrió un error. Inténtelo de nuevo más tarde.';
            $response['obj'] = $error;
        }

        // Optionally, you can return a response or redirect to a specific page
        // For example, to redirect back to a list of titles:
        return response()->json($response);
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $title = Title::find($id);

        if($title && $title->status === 1){
            $userServices = User::find(Auth::user()->id)->services->pluck('service_id')->toArray();
            
            $titleOnServices = $title->services;
            $services = [];
            $array = [];
            $alreadySaved = false;
            $genres = $title->genresDirect;
            
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
    
                return Inertia::render('Title/Title', ['title' => $title, 'services' => $services, 'alreadySaved' => $alreadySaved, 'genres' => $genres]);
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

    public function getTitlesFromAPI(string $query)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYzA1OTYzYjA4OWUwZjJkOGI1MzNjZTkwMjBkZjlmNCIsInN1YiI6IjYyY2UxMzVlZDc1YmQ2MDBjMTRlMjY2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.moP3Mbp3610Cv5GUbgLVUVOYl7KUMD_7iRHqWezNjP0', // Replace with your actual API key
                'accept' => 'application/json'
            ])->get("https://api.themoviedb.org/3/search/multi?query={$query}&include_adult=false&language=es-MX&page=1");

            if ($response->successful()) {
                // API request was successful
                $data = $response->json();
                return response()->json($data);
            } else {
                // Handle non-successful response (e.g., 404 Not Found, 500 Internal Server Error)
                return response()->json(['type' => 'error', 'message'  => 'Ocurrió un error. Inténtelo de nuevo más tarde.']);
            }
        } catch (RequestException $e) {
            // Handle HTTP request exceptions
            return response()->json(['type' => 'error', 'message'  => 'Ocurrió un error. Inténtelo de nuevo más tarde.']);
        } catch (\Exception $e) {
            // Handle other exceptions
            return response()->json(['type' => 'error', 'message'  => 'Ocurrió un error. Inténtelo de nuevo más tarde.']);
        }
    }

    public function getAllLocalTitles(){
        $titles = Title::orderBy('created_at', 'desc')->get();

        return response()->json($titles);
    }

    public function getStreamingData($id, $type){
        $response = [];

        $httpResponse = Http::withHeaders([
            'X-RapidAPI-Host' => 'streaming-availability.p.rapidapi.com',
            'X-RapidAPI-Key' => '68f1c519afmsh507f4877cb61cb3p15befejsn6aa174d81f5a',
            'content-type' => 'application/json'
        ])
        ->get("https://streaming-availability.p.rapidapi.com/get?output_language=es&tmdb_id={$type}%2F{$id}");

        if ($httpResponse->successful()) {
            $response = $httpResponse->json();
        }

        return $response;
    }

    public function showAddTitle(){
        return Inertia::render('AddTitle/AddTitle');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeUser(TitleRequest $request)
    {
        $response = [];

        try{
            DB::beginTransaction();
            // Create a new instance of the Title model
            $title = new Title();

            // Set the attributes based on the data in the request
            $title->id = $request->input('id');
            $title->type = $request->input('media_type');
            $title->title = $request->input('title') ?? $request->input('name');
            $title->original_title = $request->input('original_title') ?? $request->input('original_name');
            $title->year = $request->input('release_date') ? substr($request->input('release_date'), 0, 4) : substr($request->input('first_air_date'), 0, 4);
            $title->poster_path = $request->input('poster_path');
            $title->backdrop_path = $request->input('backdrop_path');
            $title->overview = $request->input('overview') ?? '';
            $title->status = 0;

            // Attach user
            $user = User::find(Auth::user()->id);
            $title->user()->associate($user);

            // Save the newly created resource to the database
            $title->save();

            // Attach the genres to the title
            $genreIds = $request->input('genre_ids');
            $title->genresDirect()->attach($genreIds);

            

            DB::commit();

            $response['type'] = 'success';
            $response['message'] = 'Se guardó la solicitud con éxito. Queda en espera de aprobación.';
        }catch(Exception $error){
            DB::rollBack();
            $response['type'] = 'error';
            $response['message'] = 'Ocurrió un error. Inténtelo de nuevo más tarde.';
            $response['obj'] = $error;
        }

        // Optionally, you can return a response or redirect to a specific page
        // For example, to redirect back to a list of titles:
        return response()->json($response);
    }

    public function accept(string $id){

        $response = [];


        try{
            DB::beginTransaction();
            $title = Title::findOrFail($id);

            $title->status = 1;

            $title->save();

            // Get streaming data
            $services = $this->getStreamingData($title->id, $title->type);
        
            // Attach streaming data
            if(isset($services['result']['streamingInfo']['ar']) && count($services['result']['streamingInfo']['ar']) > 0){
                $services = $services['result']['streamingInfo']['ar'];

                foreach($services as $service){
                    if($service['streamingType'] == 'subscription'){
                        $titleService = new Title_On_Service();

                        $titleService->title()->associate($title);
    
                        $localService = Service::where('id_name', $service['service'])->first();
                        $titleService->service()->associate($localService);
    
                        $titleService->link = $service['link'];

                        $titleService->quality = $service['quality'] ?? 'HD';
                        $titleService->available_since = isset($service['available_since']) ? date("Y-m-d H:i:s", $service['availableSince']) : null;
                        $titleService->leaving = isset($service['leaving']) && intval($service['leaving']) < 1919748376 ? date("Y-m-d H:i:s", $service['leaving']) : null;
                        $titleService->save();
                    }
                }
            }


            DB::commit();

            $response['type'] = 'success';
            $response['message'] = 'La solicitud fue aprobada.';
        }catch(Exception $error){
            DB::rollBack();
            $response['type'] = 'error';
            $response['message'] = 'Ocurrió un error. Inténtelo de nuevo más tarde.';
            $response['obj'] = $error;
        }


        $user = $title->user; // Assuming you have a relationship set up
        $user->notify(new ApprovalNotification($user, $title));

        // Rest of your code


        // Optionally, you can return a response or redirect to a specific page
        // For example, to redirect back to a list of titles:
        return response()->json($response);
    }

    public function deny(){
        
    }
}
