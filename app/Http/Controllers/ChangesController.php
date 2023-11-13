<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Title;
use App\Models\Title_On_Service;
use App\Models\Service;
use Exception;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\ChangesLog;
use Illuminate\Support\Facades\Log;

class ChangesController extends Controller
{
    public function perform(){
        $response = [];

        $logBody = "";

        $logTitles = [];

        $data = $this->getChangesFromAPI();

        try{
            DB::beginTransaction();

            if(!isset($data['result'])){
                throw new Exception('API call error. Check previous log');
            }

            $updatedTitles = $data['result'];

            foreach($updatedTitles as $updatedTitle){
                $type = ($updatedTitle['show']['type']) === 'movie' ? 'movie' : 'tv';
                $tmdbId = $type . '/' . $updatedTitle['show']['tmdbId'];

                $title = Title::where('tmdb_id', $tmdbId)->first();

                if($title){
                    $newServices = $updatedTitle['show']['streamingInfo']['ar'] ?? [];
                    $preexistentServices = $title->services;

                    $logTitles[] = $title;

                    foreach($preexistentServices as $service){
                        $service->delete();
                    }

                    foreach($newServices as $service){
                        if($service['streamingType'] === 'subscription'){
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

        $logBody = json_encode($logTitles);

        try{
            $log = new ChangesLog();
            if(!isset($error)){
                $log->type = 'success';
                $log->body = $logBody;
                $log->save(); 
            }else{
                $log->type = 'error';
                $log->body =
                    'SERVER ERROR: ' . 
                    $error->getCode() . ' ' .
                    $error->getMessage();
                $log->save();
            }
        }catch(Exception $logError){
            if(!isset($error)){
                Log::channel('changes')->info('success - ' . $logBody);
            }else{
                Log::channel('changes')->info('SERVER ERROR -' . $error->getCode() . ' ' . $error->getMessage());

            }
        }


        return response()->json($response);
    }

    private function getChangesFromAPI(){
        $response = [];

        $httpResponse = Http::withHeaders([
            'X-RapidAPI-Host' => 'streaming-availability.p.rapidapi.com',
            'X-RapidAPI-Key' => '68f1c519afmsh507f4877cb61cb3p15befejsn6aa174d81f5a',
            'content-type' => 'application/json'
        ])
        ->get("https://streaming-availability.p.rapidapi.com/changes", [
            'change_type' => 'updated',
            'services' => 'netflix,disney,apple.subscription,prime.subscription,hbo,paramount',
            'target_type' => 'show',
            'country' => 'ar',
            'output_language' => 'es',
            'since' => time() - 21600
        ]);

        if ($httpResponse->successful()) {
            $response = $httpResponse->json();
        }else{
            $log = new ChangesLog();
            $log->type = 'error';
            $log->body =
            'API ERROR: ' .
            print_r($httpResponse->status(), true) . ' ' .
            print_r($httpResponse->body(), true);
            $log->save();
        }

        return $response;
    }

    public function show(){
        // get changes log
        $changes = ChangesLog::orderBy('created_at', 'desc')->get();

        return Inertia::render('Dashboard/Changes', ['changes' => $changes]);
    }

    public function index(){
        // get changes log
        $changes = ChangesLog::orderBy('created_at', 'desc')->get();

        return response()->json($changes);
    }

    public function showBody(string $id){
        // get changes log
        $change = ChangesLog::find($id);

        return response()->json($change);
    }
}
