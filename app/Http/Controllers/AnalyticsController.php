<?php

namespace App\Http\Controllers;

use App\Exports\AnalyticsExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Title;
use App\Models\User_Views_Title;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use App\Models\Review;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;

class AnalyticsController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Analytics');
    }

    public function perform(Request $request)
    {
        $response = [];

        // Obtener todos los datos de valor y asignarlos a variables
        $mediaType = $request->input('mediaType')['value'];
        $type = $request->input('type')['value'] ?? '';

        $dateFrom = $request->input('dateFrom');

        $dateUntil = Carbon::parse($request->input('dateUntil'))
                                ->addDay()
                                ->toDateString();


        // Most viewed tv shows, movies or both
        if($type === 'mostviewed' && $mediaType !== 'services'){
            $data = User_Views_Title::select(
                'user_views_title.title_id',
                'titles.title',
                DB::raw('COUNT(*) as view_count'),
                'titles.type',
            )
                ->join('titles', 'user_views_title.title_id', '=', 'titles.id')
                ->where(function($query) use ($mediaType){
                    if($mediaType !== 'show'){
                        $query->where('titles.type', $mediaType);
                    }
                })
                ->where('user_views_title.updated_at', '>=', $dateFrom)
                ->where('user_views_title.updated_at', '<', $dateUntil)
                ->groupBy('user_views_title.title_id', 'titles.type', 'titles.title')
                ->orderByDesc('view_count')
                ->get();
        }

        // Most reviewed tv shows, movies or both
        if($type === 'mostreviewed' && $mediaType !== 'services'){
            $data = Review::select(
                'reviews.title_id',
                'titles.title',
                DB::raw('COUNT(*) as review_count'),
                'titles.type',

            )
                ->join('titles', 'reviews.title_id', '=', 'titles.id')
                ->where(function($query) use ($mediaType){
                    if($mediaType !== 'show'){
                        $query->where('titles.type', $mediaType);
                    }
                })
                ->where('reviews.created_at', '>=', $dateFrom)
                ->where('reviews.created_at', '<', $dateUntil)
                ->whereNull('reviews.disabled_at')
                ->groupBy('reviews.title_id', 'titles.type', 'titles.title')
                ->orderByDesc('review_count')
                ->get();
        }

        // Best reviewed tv shows, movies or both
        if($type === 'bestreviewed' && $mediaType !== 'services'){
            $data = Review::select(
                'reviews.title_id',
                'titles.title',
                DB::raw('AVG(star_number) as review_average'),
                DB::raw('COUNT(*) as review_count'),
                'titles.type',
            )
                ->join('titles', 'reviews.title_id', '=', 'titles.id')
                ->where(function($query) use ($mediaType){
                    if($mediaType !== 'show'){
                        $query->where('titles.type', $mediaType);
                    }
                })
                ->where('reviews.created_at', '>=', $dateFrom)
                ->where('reviews.created_at', '<', $dateUntil)
                ->whereNull('reviews.disabled_at')
                ->groupBy('reviews.title_id', 'titles.type', 'titles.title')
                ->orderByDesc('review_average')
                ->get();
        }

        // Most viewed services
        if($mediaType === 'services'){
            $data = User_Views_Title::select(
                'user_views_title.service_id',
                'services.name',
                DB::raw('COUNT(service_id) as view_count'),
            )
                ->join('services', 'user_views_title.service_id', '=', 'services.id')

                ->where('user_views_title.updated_at', '>=', $dateFrom)
                ->where('user_views_title.updated_at', '<', $dateUntil)
                
                ->groupBy('user_views_title.service_id', 'services.name')
                ->orderByDesc('view_count')
                ->get();
        }

                
        $response['data'] = $data;
        $response['report'] = $this->generateTitle($request);

        $path = 'public/excel/' . $mediaType . $type . $dateFrom . $dateUntil . '.xlsx';

        if(!Storage::exists($path)){
            Excel::store(new AnalyticsExport($data), "public/excel/" . $mediaType . $type . $dateFrom . $dateUntil . ".xlsx");
        }


        

        $response['path'] = $mediaType . $type . $dateFrom . $dateUntil . '.xlsx';


        // $response['request'] = $mediaType . $type . $dateFrom . $dateUntil;


        return response()->json($response);
    }

    private function generateTitle(Request $request) : string
    {
        $response = "";

        $mediaTypeOptions = [
            'movie' => 'Películas ',
            'tv' => 'Series ',
            'show' => 'Películas y series ',
            'services' => 'Servicios '
        ];

        $typeOptions = [
            'mostviewed' => 'más vistas ',
            'mostreviewed' => 'más calificadas ',
            'bestreviewed' => 'mejor calificadas '
        ];

        $dateFrom = $request->input('dateFrom');
        $dateUntil = $request->input('dateUntil');

        $response .= $mediaTypeOptions[$request->input('mediaType')['value']];
        
        if($request->input('type')){
            $response .= $typeOptions[$request->input('type')['value']];
        }else{
            $response .= 'más vistos ';
        }

        $response .= "({$dateFrom} - {$dateUntil})";



        return $response;
    }

    public function excel($file){
        $path = "public/excel/";

        return Storage::download($path . $file, $file);
    }

    public function csv($file){
        $path = "public/csv/";

        return Storage::download($path . $file, $file);
    }

    public function pdf($file){
        $path = "public/pdf/";

        return Storage::download($path . $file, $file);
    }
}
