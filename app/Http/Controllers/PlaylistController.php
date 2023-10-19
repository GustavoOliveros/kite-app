<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;
use App\Models\Playlist;
use Illuminate\Support\Facades\Auth;
use App\Models\Playlist_Has_Title;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class PlaylistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $titleId)
    {
        $response['playlists'] = [];
        $response['selectedValues'] = [];
        $playlists = Playlist::where('user_id', Auth::user()->id)->orderBy('created_at', 'desc')->get();

        if($playlists){
            foreach ($playlists as $playlist) {
                $playlistTitle = Playlist_Has_Title::where('playlist_id', $playlist->id)->where('title_id', $titleId)->first();

                if($playlistTitle){
                    $response['selectedValues'][] = $playlist->id;  
                }

                $response['playlists'][] = $playlist;
            }
        }

        return response()->json($response);
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
        $response = [];
        $playlist = new Playlist();

        $user = User::find(Auth::user()->id);
        $playlist->user()->associate($user);

        $playlist->title = $request->input('title');


        try{
            $playlist->save();
            $response['type'] = 'success';
            $response['message'] = 'Se ha guardado con éxito.';
        }catch(Exception $error){
            $response['type'] = 'error';
            $response['message'] = 'Ocurrió un error. Inténtelo de nuevo más tarde.';
            $response['obj'] = $error;
        }

        return response()->json($response);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $titles = [];

        try{
            $playlist = Playlist::
                where('id', $id)
                ->firstOrFail();

            $playlistTitles = Playlist_Has_Title::
                where('playlist_id', $id)
                ->orderBy('created_at', 'desc')
                ->get();

            if($playlistTitles){
                foreach($playlistTitles as $playlistTitle){
                    array_push($titles, $playlistTitle->title);
                }
            }

            if($playlist->user->id != Auth::user()->id){
                throw new Exception('No tienes acceso a esta lista.', 403);
            }
        }catch(Exception $error){

            if($error->getCode() == 403){
                return redirect()->route('library')->withErrors($error->getMessage());
            }else{
                return redirect()->route('library')->withErrors('Ocurrió un error. Inténtelo de nuevo más tarde.');
            }
        }

        return Inertia::render('Playlist/Playlist', ['playlist' => $playlist, 'titles' => $titles]);
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
    public function destroy($id){
        try{
            DB::beginTransaction();
            $playlist = Playlist::where('user_id', Auth::user()->id)
                ->where('id', $id)
                ->firstOrFail();

            $playlistTitles = Playlist_Has_Title::where('playlist_id', $id)->get();

            if($playlistTitles){
                foreach($playlistTitles as $playlistTitle){
                    $playlistTitle->delete();
                }
            }

            $playlist->delete();
            DB::commit();
        }catch(Exception $error){
            DB::rollBack();
            return redirect()->route('library')->withErrors('Ocurrió un error al eliminar la lista.');
        }

        return redirect()->route('library')->with('success', 'Lista eliminada con éxito');
    }

    public function filterPlaylist($id, $filter){
        $response = [];
        $filter = ($filter == 'newest') ? 'desc' : 'asc';

        $playlistTitles = Playlist_Has_Title::
                where('playlist_id', $id)
                ->orderBy('created_at', $filter)
                ->get();

        if($playlistTitles){
            foreach($playlistTitles as $playlistTitle){
                array_push($response, $playlistTitle->title);
            }
        }

        return response()->json($response);
    }


    public function savePlaylistSelection(Request $request){
        $response = [];
        $selectedValues = $request->input('selectedValues');
        $playlistTitles = Playlist_Has_Title::where('title_id', $request->input('titleId'))
            ->whereHas('playlist', function($query) {
                $query->where('user_id', Auth::user()->id);
            })
            ->get();

        try{
            if($selectedValues){
                foreach($selectedValues as $selectedValue){
                    $alreadyExists = $playlistTitles->where('playlist_id', $selectedValue)->first();
                    
                    if(!$alreadyExists){
                        $newPlaylistTitle = new Playlist_Has_Title();
                        $newPlaylistTitle->playlist_id = $selectedValue;
                        $newPlaylistTitle->title_id = $request->input('titleId');
                        $newPlaylistTitle->save();
                    }
    
                    $playlistTitles = $playlistTitles->reject(function ($item) use ($selectedValue) {
                        return $item->playlist_id == $selectedValue;
                    });
                }
                foreach($playlistTitles as $playlistTitle){
                    $playlistTitle->delete();
                }
            }else{
                foreach($playlistTitles as $playlistTitle){
                    $playlistTitle->delete();
                }
            }

            $response['type'] = 'success';
            $response['message'] = 'Se ha guardado con éxito.';
        }catch(Exception $error){
            $response['type'] = 'error';
            $response['message'] = 'Ocurrió un error. Inténtelo de nuevo más tarde.';
            $response['obj'] = $error;
        }

        return response()->json($response);
    }
}
