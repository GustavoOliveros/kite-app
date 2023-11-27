<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Title;
use App\Models\User_Views_Genre;
use Spatie\Permission\Models\Permission;
use App\Models\User_Views_Title;
use Illuminate\Support\Facades\DB;
use Mpdf\Tag\S;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::check()) {
            return redirect()->route('home');
        }

        $services = Service::all();

        return Inertia::render('LandingPage', ['services' => $services]);
    }

    public function indexHomepage()
    {
        //  check if user has services
        $user = User::where('id', Auth::user()->id)->first();
        $services = $user->servicesDirect;


        $lists = $this->getUserLists();



        return Inertia::render('Home/Home', ['services' => $services, 'lists' => $lists]);
    }

    public function loadMoreTitles(string $page)
    {
        $perPage = 20;

        // Fetch titles using pagination
        $titles = Title::where('status', 1)->paginate($perPage, ['*'], 'page', $page)->map(function ($title) {
            return [
                'id' => $title->id,
                'title' => $title->title,
                'poster_path' => $title->poster_path,
                'type' => $title->type,
                'backdrop_path' => $title->backdrop_path,
                'year' => $title->year
            ];
        });

        return response()->json($titles);
    }

    private function getUserLists()
    {
        // Ult accesos -1 
        // Mas populares 0
        // Categorias ordenas por mayor view_count +1

        $data = [];

        $data[] = HistoryController::getUserHistory();
        $data[] = $this->getMostPopular();

        $genres = $this->getUserGenres();

        if($genres && count($genres) > 0){
            $data[] = $genres[0];
            $data[] = $genres[1];
        }else{
            $genres = Genre::with('titles')->orderBy('name', 'asc')->take(2)->get()->map(function ($genre){
                return [
                    'id' => $genre->id,
                    'name' => $genre->name,
                    'titles' => $genre->titles->take(15),
                ];
            })->toArray();
            $data = array_merge($data, $genres);
            
        }

    
        return $data;
    }

    private function getMostPopular()
    {
        $data = [];

        $userTitles = User_Views_Title::select(
            'user_views_title.title_id',
            'titles.title',
            DB::raw('COUNT(*) as view_count'),
            'titles.type',
        )
            ->join('titles', 'user_views_title.title_id', '=', 'titles.id')
            ->where('user_views_title.updated_at', '>=', now()->subYear())
            ->groupBy('user_views_title.title_id', 'titles.type', 'titles.title')
            ->orderByDesc('view_count')
            ->take(15)
            ->get();

        $data['id'] = 0;
        $data['name'] = "Más populares";
        $data['titles'] = $userTitles;

        return $data;
    }

    private function getUserGenres()
    {
        $titles = [];
        $counter = 0;
        $maxTitles = 15;
    
        $user = User::find(Auth::user()->id);
    
        $genres = User_Views_Genre::with('genre')
            ->where('user_id', Auth::user()->id)
            ->orderBy('view_count', 'desc')
            ->take(2)
            ->get()
            ->map(function ($userGenre) {
                return [
                    'id' => $userGenre->genre->id,
                    'name' => $userGenre->genre->name,
                    'titles' => $userGenre->genre->titles->take(15),
                ];
            });
    
        foreach ($genres as $genre) {
            $indexTitle = 0;
    
            while ($counter < $maxTitles && $indexTitle < count($genre['titles'])) {
                $title = $genre['titles'][$indexTitle];
    
                $userServices = $user->servicesDirect->pluck('id')->toArray();
                $titleServices = $title->servicesDirect->pluck('id')->toArray();
    
                $intersect = array_intersect($userServices, $titleServices);
    
                if ($intersect && count($intersect) > 0) {
                    $titles[] = $title;
                    $counter++;
                }
    
                $indexTitle++;
            }
        }
    
        return $genres;
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
}
