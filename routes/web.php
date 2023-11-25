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
use App\Http\Controllers\GenreController;
use App\Http\Controllers\HistoryController;
use Psy\Command\HistoryCommand;
use App\Http\Controllers\ChangesController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\ReminderController;

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

// Test
Route::get('/test/{id}/{type}', [TitleController::class, 'getStreamingData']);
Route::get('/test/pdf', function(){
    return view('pdf/analytics', [
        'title' => "pepepepe",
        'data' => [
            [
                'pos' => 1,
                'itemId' => 1,
                'item' => 'caca',
                'cantidad' => 23
            ]
        ]

    ]);
});
Route::get('/test/changes', [ChangesController::class, 'getChangesTest']);

// Guests
Route::get('/', [HomeController::class, 'index']);

// Users without services
Route::group(['middleware' => ['no access app', 'auth', 'verified']], function () {
    // Service selection
    Route::get('/services', [ServiceController::class, 'index'])->name('services');
    Route::post('/services-selection', [UserController::class, 'addServices'])
        ->name('services-selection');
});

// All users, except those who have not selected their streaming services
Route::group(['middleware' => ['access app', 'auth', 'verified']], function () {
    // Home
    Route::get('/home', [HomeController::class, 'indexHomepage'])
        ->name('home');

    // Search
    Route::get('/search', [SearchController::class, 'show'])->name('search');
    Route::post('/search', [SearchController::class, 'perform'])
        ->name('search-term');

    // Title
    Route::get('/title/{id}', [TitleController::class, 'show'])->name('title.show');
    Route::get('/titles/{query}/API', [TitleController::class, 'getTitlesFromAPI'])->name('getTitlesFromAPI');
    Route::get('/add-title', [TitleController::class, 'showAddTitle'])->name('showAddTitle');
    Route::post('/add-title', [TitleController::class, 'storeUser'])->name('storeUser');

    // Library
    Route::get('/your-library', [LibraryController::class, 'show'])->name('library');
    Route::get('/your-library/{filter}', [LibraryController::class, 'filterLibrary'])->name('filterLibrary');
    Route::post('/your-library/save', [LibraryController::class, 'store'])->name('saveToLibrary');
    Route::delete('/your-library/delete/{titleId}', [LibraryController::class, 'destroy'])->name('deleteFromLibrary');

    // Playlist
    Route::get('/playlist/{id}', [PlaylistController::class, 'show'])->name('playlist.show');
    Route::get('/playlists/{titleId}', [PlaylistController::class, 'index'])->name('playlist.index');
    Route::get('/playlist/{id}/{filter}', [PlaylistController::class, 'filterPlaylist'])->name('filterPlaylist');
    Route::post('/playlist', [PlaylistController::class, 'store'])->name('playlist.store');
    Route::post('/playlists/save', [PlaylistController::class, 'savePlaylistSelection'])->name('savePlaylistSelection');
    Route::delete('/playlist/{id}', [PlaylistController::class, 'destroy'])->name('playlist.destroy');

    // Genres
    Route::get('/genre/{id}', [GenreController::class, 'show'])->name('genres.show');

    // History
    Route::get('/title/{id}/{service}/watch', [HistoryController::class, 'saveHistory'])->name('saveHistory');
    Route::get('/your-history', [HistoryController::class, 'show'])->name('history');

    // Reviews
    Route::post('/review', [ReviewController::class, 'store'])->name('review.store');
    Route::get('/reviews/{titleId}', [ReviewController::class, 'getReviews'])->name('getReviews');

    // Reminders
    Route::get('/your-reminders', [ReminderController::class, 'index'])->name('reminder.index');
    Route::get('/setreminder/{id}', [ReminderController::class, 'store'])->name('reminder.store');
    Route::delete('/unsetreminder/{id}', [ReminderController::class, 'destroy'])->name('reminder.destroy');
    Route::get('/getreminders', [ReminderController::class, 'all'])->name('reminder.all');
    Route::get('/your-notifications', [ReminderController::class, 'getNotifications'])->name('notifications');
    Route::post('/markAsRead', [ReminderController::class, 'markAsRead'])->name('markAsRead');




    // Dashboard (admins & moderators)
    Route::group(['middleware' => ['can:access dashboard']], function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])
            ->name('dashboard');

        // USERS
        Route::get('/users', [UserController::class, 'index'])
            ->middleware(['can:see users'])->name('users');

        // TITLES
        Route::get('/titles', [TitleController::class, 'index'])
            ->middleware(['can:see titles'])->name('titles');

        Route::post('/titles', [TitleController::class, 'store'])
            ->middleware(['can:add titles'])->name('title.store');

        Route::get('/titles/all', [TitleController::class, 'getAllLocalTitles'])
            ->middleware(['can:see titles'])->name('getAllLocalTitles');
        Route::get('/titles/{id}/accept', [TitleController::class, 'accept'])
            ->middleware(['can:edit titles'])->name('acceptTitle');

        // CHANGES
        Route::get('/changes/perform', [ChangesController::class, 'perform'])
            ->middleware(['can:perform changes'])->name('performChanges');

        Route::get('/changes', [ChangesController::class, 'show'])
            ->middleware(['can:see changes log'])->name('changes.show');

        Route::get('/changes/all', [ChangesController::class, 'index'])
            ->middleware(['can:see changes log'])->name('changes.index');

        Route::get('/changes/{id}', [ChangesController::class, 'showBody'])
            ->middleware(['can:see changes log'])->name('changes.showbody');

        // ANALYTICS
        Route::get('/analytics', [AnalyticsController::class, 'index'])
            ->middleware(['can:analytics'])->name('analytics');

        Route::post('/analytics/perform', [AnalyticsController::class, 'perform'])
            ->middleware(['can:analytics'])->name('analytics.perform');
        
        Route::get('/analytics/{file}/excel', [AnalyticsController::class, 'excel'])
            ->middleware(['can:analytics'])->name('analytics.excel');
        
        Route::get('/analytics/{file}/pdf', [AnalyticsController::class, 'pdf'])
            ->middleware(['can:analytics'])->name('analytics.pdf');
    });
});

require __DIR__ . '/auth.php';
