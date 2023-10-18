<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TitleController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\PlaylistController;
use App\Models\Playlist;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Everyone
Route::get('/popular', [TitleController::class, 'popular']);

// Guests
Route::get('/', [HomeController::class, 'index']);

// Users without services
Route::group(['middleware' => ['no access app', 'auth']], function(){
    // Service selection
    Route::get('/services', [ServiceController::class, 'index'])->name('services');
    Route::post('/services-selection', [UserController::class,'addServices'])
        ->name('services-selection');
});

// All users, except those who have not selected their streaming services
Route::group(['middleware' => ['access app', 'auth']], function(){
    // Home
    Route::get('/home', [HomeController::class, 'indexHomepage'])
        ->name('home');

    // Search
    Route::get('/search', function () {
        return Inertia::render('Search/Search');
    })->name('search');
    Route::get('/search/{query}', [SearchController::class, 'perform'])
        ->name('search-term');

    // Title
    Route::get('/title/{id}', [TitleController::class, 'show'])->name('title.show');

    // Library
    Route::get('/your-library', [LibraryController::class, 'show'])->name('library');
    Route::get('/your-library/{filter}', [LibraryController::class, 'filterLibrary'])->name('filterLibrary');
    Route::post('/your-library/save', [LibraryController::class, 'store'])->name('saveToLibrary');
    Route::delete('/your-library/delete/{titleId}', [LibraryController::class, 'destroy'])->name('deleteFromLibrary');

    // Playlist
    Route::get('/playlist/{id}', [PlaylistController::class, 'show'])->name('playlist.show');
    Route::get('/playlist/{id}/{filter}', [PlaylistController::class, 'filterPlaylist'])->name('filterPlaylist');
    Route::delete('/playlist/{id}', [PlaylistController::class, 'destroy'])->name('playlist.destroy');
    Route::get('/playlists/{titleId}', [PlaylistController::class, 'index'])->name('playlist.index');
    Route::post('/playlists/save', [PlaylistController::class, 'savePlaylistSelection'])->name('savePlaylistSelection');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Dashboard (admins & moderators)
    Route::group(['middleware' => ['can:access dashboard']], function(){
        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');

        // USERS
        Route::get('/users', [UserController::class, 'index'])
            ->middleware(['can:see users'])->name('users');

        // TITLES
        Route::get('/titles', [TitleController::class, 'index'])
            ->middleware(['can:see titles'])->name('titles');
    });
});

require __DIR__.'/auth.php';
