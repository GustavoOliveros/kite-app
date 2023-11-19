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
use App\Http\Controllers\PdfController as PDF;
use Exception;

class AnalyticsController extends Controller
{
    // Vista


    public function index()
    {
        return Inertia::render('Dashboard/Analytics');
    }


    // Método principal


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
        $filename = $mediaType . $type . $dateFrom . $dateUntil;


        //  Ejecutará el caso que sea true
        switch (true) {
            case $type === 'mostviewed' && $mediaType !== 'services':
                $data = $this->getMostViewedTitles($dateFrom, $dateUntil, $mediaType);
                break;
            case $type === 'mostreviewed' && $mediaType !== 'services':
                $data = $this->getMostReviewedTitles($dateFrom, $dateUntil, $mediaType);
                break;
            case $type === 'bestreviewed' && $mediaType !== 'services':
                $data = $this->getBestReviewedTitles($dateFrom, $dateUntil, $mediaType);
                break;
            case $mediaType === 'services':
                $data = $this->getMostViewedService($dateFrom, $dateUntil);
                break;
            default:
                throw new Exception('Entrada inválida');
                break;
        }

        // Handler de datos
        $data = $this->handleData($data);

        // Generación
        $title = $this->generateTitle($request);
        $this->generateFiles($data, $filename, $title);

        // Response
        $response['data'] = $data;
        $response['filename'] = $filename;
        $response['title'] = $title;

        return response()->json($response);
    }


    // Obtencion de datos


    private function getMostViewedService($dateFrom, $dateUntil)
    {
        $data = [];

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

            ->take(15)
            ->get();

        return $data;
    }

    private function getMostViewedTitles($dateFrom, $dateUntil, $mediaType){
        $data = [];

        $data = User_Views_Title::select(
            'user_views_title.title_id',
            'titles.title',
            DB::raw('COUNT(*) as view_count'),
            'titles.type',
        )
            ->join('titles', 'user_views_title.title_id', '=', 'titles.id')
            ->where(function ($query) use ($mediaType) {
                if ($mediaType !== 'show') {
                    $query->where('titles.type', $mediaType);
                }
            })
            ->where('user_views_title.updated_at', '>=', $dateFrom)
            ->where('user_views_title.updated_at', '<', $dateUntil)
            ->groupBy('user_views_title.title_id', 'titles.type', 'titles.title')
            ->orderByDesc('view_count')
            ->take(15)
            ->get();

        return $data;
    }

    private function getMostReviewedTitles($dateFrom, $dateUntil, $mediaType){
        $data = [];

        $data = Review::select(
            'reviews.title_id',
            'titles.title',
            DB::raw('COUNT(*) as review_count'),
            'titles.type',

        )
            ->join('titles', 'reviews.title_id', '=', 'titles.id')
            ->where(function ($query) use ($mediaType) {
                if ($mediaType !== 'show') {
                    $query->where('titles.type', $mediaType);
                }
            })
            ->where('reviews.created_at', '>=', $dateFrom)
            ->where('reviews.created_at', '<', $dateUntil)
            ->whereNull('reviews.disabled_at')
            ->groupBy('reviews.title_id', 'titles.type', 'titles.title')
            ->orderByDesc('review_count')
            ->take(15)
            ->get();

        return $data;
    }

    private function getBestReviewedTitles($dateFrom, $dateUntil, $mediaType){
        $data = [];

        $data = Review::select(
            'reviews.title_id',
            'titles.title',
            DB::raw('AVG(star_number) as review_average'),
            DB::raw('COUNT(*) as review_count'),
            'titles.type',
        )
            ->join('titles', 'reviews.title_id', '=', 'titles.id')
            ->where(function ($query) use ($mediaType) {
                if ($mediaType !== 'show') {
                    $query->where('titles.type', $mediaType);
                }
            })
            ->where('reviews.created_at', '>=', $dateFrom)
            ->where('reviews.created_at', '<', $dateUntil)
            ->whereNull('reviews.disabled_at')
            ->groupBy('reviews.title_id', 'titles.type', 'titles.title')
            ->orderByDesc('review_average')
            ->take(15)
            ->get();

        return $data;
    }


    // Generación


    private function generateTitle(Request $request): string
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

        if ($request->input('type')) {
            $response .= $typeOptions[$request->input('type')['value']];
        } else {
            $response .= 'más vistos ';
        }

        $response .= "({$dateFrom} - {$dateUntil})";

        return $response;
    }

    private function generateFiles($data, $filename, $title){
        $excelRoot = 'public/excel/';
        $pdfRoot = 'public/pdf/';

        // Excel
        if (!Storage::exists($excelRoot  . $filename . '.xlsx')) {
            Excel::store(new AnalyticsExport($data), $excelRoot . $filename . ".xlsx");
        }

        //  PDF
        if(!Storage::exists($pdfRoot . $filename . '.pdf')){
            PDF::store($data, $title, $pdfRoot . $filename . '.pdf');
        }
    }


    // Procesar datos


    private function handleData($data){
        $response = [];

        $collection = $data;

        for($i = 0; $i < count($collection); $i++){
            $row = [];

            $row['pos'] = $i + 1;
            $row['itemId'] = $collection[$i]['service_id'] ?? $collection[$i]['title_id'];
            $row['item'] = $collection[$i]['name'] ?? $collection[$i]['title'];


            if(isset($collection[$i]['view_count'])){
                $row['cantidad'] = $collection[$i]['view_count'];
            }elseif(isset($collection[$i]['review_average'])){
                $row['cantidad'] = "{$collection[$i]['review_average']} ({$collection[$i]['review_count']})";
            }else {
                $row['cantidad'] = $collection[$i]['review_count'];
            }

            array_push($response, $row);
        }

        $response = collect($response);

        return $response;
    }


    // Descarga


    public function excel($file)
    {
        $path = "public/excel/";

        return Storage::download($path . $file, $file);
    }

    public function pdf($file)
    {
        $path = "public/pdf/";

        return Storage::download($path . $file, $file);
    }
}
