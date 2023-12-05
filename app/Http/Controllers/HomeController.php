<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\User;
use App\Models\User_Views_Genre;
use App\Models\User_Views_Title;
use Illuminate\Support\Facades\DB;
use App\Models\Title;
use Illuminate\Pagination\LengthAwarePaginator;

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
        // Servicios
        $user = User::where('id', Auth::user()->id)->first();
        $services = $user->servicesDirect;

        // Listas
        $lists = $this->getUserLists();

        return Inertia::render('Home/Home', ['services' => $services, 'lists' => $lists['data'], 'hasMore' => $lists['hasMore']]);
    }

    public function loadMoreUserGenres(string $page)
    {
        $page = $page + 1;

        $user = User::find(Auth::user()->id);
        $response = [];

        $genres = $this->getUserGenres($user, $page);

        $response['data'] = $genres['genres'];
        $response['page'] = $page;
        $response['hasMore'] = $genres['hasMore'];

        return response()->json($response);
    }

    public function loadMoreGenres(string $page)
    {
        $page = $page + 1;

        $user = User::find(Auth::user()->id);
        $response = [];

        $genres = $this->getGenres($user, $page);

        $response['data'] = $genres['genres'];
        $response['page'] = $page;
        $response['hasMore'] = $genres['hasMore'];

        return response()->json($response);
    }


    /**
     * Obtiene todas las lista del usuario que se muestran inicialmente
     */
    private function getUserLists()
    {
        // Obtencion del usuario
        $user = User::find(Auth::user()->id);

        $data = [];


        $data[] = $this->getMostPopular($user); // Más vistos

        // Creacion de listas
        $history = HistoryController::getUserHistory($user); // Historial

        if (isset($history['titles']) && count($history['titles']) > 0) {
            $data[] = $history;
        }

        $library = LibraryController::getUserTitles();

        if($library && count($library) > 0){
            $aux['id'] = 2;
            $aux['name'] = "En biblioteca";
            $aux['titles'] = $library;
            $data[] = $aux;
        }


        $userGenres = $this->getUserGenres($user);

        $genres = $userGenres['genres']->toArray();
        $hasMore = $userGenres['hasMore'];

        // Si existen tres generos consumidos por el usuario, se muestran esos
        // Caso contrario se muestran por orden alfabetico
        if ($genres && count($genres) === 3) {
            $data = array_merge($data, $genres);
        } else {
            $genres = $this->getGenres($user)['genres']->toArray();
            $data = array_merge($data, $genres);
        }

        $data['data'] = $data;
        $data['hasMore'] = $hasMore;

        return $data;
    }


    /**
     * Obtiene los títulos más vistos entre los servicios contratados por el usuario
     */
    private function getMostPopular(User $user)
    {
        $data = [];

        $userServices = $user->servicesDirect->pluck('id')->toArray();

        $userTitles = User_Views_Title::select(
            'titles.id',
            'titles.title as name',
            'titles.type',
            'titles.poster_path',
            'titles.backdrop_path',
            'titles.year',
            DB::raw('COUNT(*) as view_count'),
        )
            ->join('titles', 'user_views_title.title_id', '=', 'titles.id')
            ->where('user_views_title.updated_at', '>=', now()->subWeek())
            ->groupBy('user_views_title.title_id', 'titles.type', 'titles.title')
            ->orderByDesc('view_count')
            ->take(15)
            ->with('title')
            ->get();

        $position = 1; // Start position

        $mappedTitles = collect([]); // Create an empty collection

        $userTitles->each(function ($userTitle) use ($user, $userServices, &$position, &$mappedTitles) {
            $title = Title::find($userTitle->id);
            $isUserSubscribed = $title->servicesDirect->pluck('id')->intersect($userServices)->isNotEmpty();

            $userServices = $user->servicesDirect->pluck('id')->toArray();

            // Add the title details along with the position to the collection
            $mappedTitles->push([
                'position' => $position,
                'id' => $userTitle->id,
                'title' => $userTitle->name,
                'poster_path' => $userTitle->poster_path,
                'type' => $userTitle->type,
                'backdrop_path' => $userTitle->backdrop_path,
                'year' => $userTitle->year,
                'isUserSubscribed' => $isUserSubscribed,
            ]);

            $position++; // Increment position for the next iteration
        });


        $data['id'] = 0;
        $data['name'] = "Más populares";
        $data['titles'] = $mappedTitles;

        return $data;
    }

    /**
     * Obtiene los generos más vistos del usuario y filtra que muestren solo
     * los titulos disponibles en los servicios contratados por el usuario
     */
    private function getUserGenres(User $user, int $page = 1)
    {
        $perPage = 3;

        $response = [];

        $userGenres = User_Views_Genre::where('user_id', Auth::user()->id)
            ->orderBy('view_count', 'desc')
            ->get();

        $filteredGenres = $userGenres->filter(function ($userGenre) use ($user) {
            $titlesCount = $userGenre->genre->titles()->whereIn('titles.id', function ($query) use ($user) {
                $query->select('titles.id')
                    ->from('titles')
                    ->join('title_on_service', 'titles.id', '=', 'title_on_service.title_id')
                    ->join('user_has_service', 'title_on_service.service_id', '=', 'user_has_service.service_id')
                    ->where('user_has_service.user_id', '=', $user->id)
                    ->groupBy('titles.id'); // Ensure uniqueness
            })->count();

            // Only include genres with more than five titles
            return $titlesCount > 1;
        })->values();

        // Create a custom paginator
        $pagedGenres = $filteredGenres->slice(($page - 1) * $perPage, $perPage)->values();
        $genresPaginator = new LengthAwarePaginator($pagedGenres, count($filteredGenres), $perPage, $page);

        $mappedGenres = $pagedGenres->map(function ($userGenre) use ($user) {
            return [
                'id' => $userGenre->genre->id,
                'name' => $userGenre->genre->name,
                'titles' => $userGenre->genre->titles()->whereIn('titles.id', function ($query) use ($user) {
                    $query->select('titles.id')
                        ->from('titles')
                        ->join('title_on_service', 'titles.id', '=', 'title_on_service.title_id')
                        ->join('user_has_service', 'title_on_service.service_id', '=', 'user_has_service.service_id')
                        ->where('user_has_service.user_id', '=', $user->id)
                        ->groupBy('titles.id'); // Ensure uniqueness
                })
                    ->select('titles.id', 'titles.title', 'titles.poster_path', 'titles.type', 'titles.backdrop_path', 'titles.year')
                    ->inRandomOrder()
                    ->take(15)
                    ->get(),
            ];
        });

        $response['hasMore'] = $genresPaginator->hasMorePages();
        $response['genres'] = $mappedGenres;

        return $response;
    }

    /**
     * Obtener los géneros alfabeticamente
     */
    private function getGenres(User $user, int $page = 1)
    {
        $perPage = 3;

        $response = [];

        // Evitar que se repitan las listas
        $alreadyShown = User_Views_Genre::where('user_id', $user->id)->pluck('genre_id');

        $genres = Genre::whereNotIn('id', $alreadyShown)
            ->orderBy('name', 'asc')
            ->get();

        $filteredGenres = $genres->filter(function ($genre) use ($user) {
            $titlesCount = $genre->titles()->whereIn('titles.id', function ($query) use ($user) {
                $query->select('titles.id')
                    ->from('titles')
                    ->join('title_on_service', 'titles.id', '=', 'title_on_service.title_id')
                    ->join('user_has_service', 'title_on_service.service_id', '=', 'user_has_service.service_id')
                    ->where('user_has_service.user_id', '=', $user->id)
                    ->groupBy('titles.id'); // Ensure uniqueness
            })->count();

            // Only include genres with more than five titles
            return $titlesCount > 1;
        })->values();

        // Create a custom paginator
        $pagedGenres = $filteredGenres->slice(($page - 1) * $perPage, $perPage)->values();
        $genresPaginator = new LengthAwarePaginator($pagedGenres, count($filteredGenres), $perPage, $page);

        $mappedGenres = $pagedGenres->map(function ($genre) use ($user) {
            return [
                'id' => $genre->id,
                'name' => $genre->name,
                'titles' => $genre->titles()->whereIn('titles.id', function ($query) use ($user) {
                    $query->select('titles.id')
                        ->from('titles')
                        ->join('title_on_service', 'titles.id', '=', 'title_on_service.title_id')
                        ->join('user_has_service', 'title_on_service.service_id', '=', 'user_has_service.service_id')
                        ->where('user_has_service.user_id', '=', $user->id)
                        ->groupBy('titles.id'); // Ensure uniqueness
                })
                    ->select('titles.id', 'titles.title', 'titles.poster_path', 'titles.type', 'titles.backdrop_path', 'titles.year')
                    ->inRandomOrder()
                    ->take(15)
                    ->get(),
            ];
        });

        $response['hasMore'] = $genresPaginator->hasMorePages();
        $response['genres'] = $mappedGenres;

        return $response;
    }
}
