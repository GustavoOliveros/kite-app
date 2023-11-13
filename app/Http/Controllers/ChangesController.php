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

class ChangesController extends Controller
{
    public function perform(){
        $response = [];

        $data = $this->getChangesFromAPI();

        try{
            DB::beginTransaction();

            if(isset($data['result']) && count($data['result']) > 0){
                $updatedTitles = $data['result'];
                foreach($updatedTitles as $updatedTitle){
                    $tmdbId = $updatedTitle['show']['type'] . '/' . $updatedTitle['show']['tmdbId'];
    
                    $title = Title::where('tmdb_id', $tmdbId)->first();
    
                    if($title){
                        $newServices = $updatedTitle['show']['streamingInfo']['ar'] ?? [];
                        $preexistentServices = $title->services;
    
    
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
        }

        return $response;
    }

    public function show(){
        // get changes log

        return Inertia::render('/Dashboard/Changes');
    }
}
