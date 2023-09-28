<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\UserController;

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

Route::get('/', [HomeController::class, 'index']);

Route::get('/home', [HomeController::class, 'indexHomepage'])->middleware(['auth', 'verified'])->name('home');

Route::get('/services', [ServiceController::class, 'index'])->middleware(['auth', 'verified'])->name('services');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Home/DashboardHome');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/search', function () {
    return Inertia::render('Search/Search');
})->middleware(['auth', 'verified'])->name('search');

Route::get('/search/{query}', [SearchController::class, 'perform'])->middleware(['auth', 'verified'])->name('search-term');

Route::post('/services-selection', [UserController::class,'addServices'])->middleware(['auth', 'verified'])->name('services-selection');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



require __DIR__.'/auth.php';
