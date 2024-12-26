<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MovieController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\RecommendationController;

//Route::get('/', function () {
//    if (Auth::check()) {
//        return redirect()->route('home');
//    }
//    return redirect()->route('login');
//});

Route::controller(HomeController::class)->group(function () {
    Route::get('/', 'index')->middleware('auth')->name('home');
});

Route::get('/movie/{id}', [MovieController::class, 'show'])
    ->name('movie.show');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->get('/recommendations', [MovieController::class, 'recommend'])->name('movies.recommend');

Route::get('/history', [ProfileController::class, 'showHistory'])->middleware('auth')->name('history');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::post('/movie/{id}/favorite', [FavoriteController::class, 'addToFavorites']);
    Route::delete('/movie/{id}/favorite', [FavoriteController::class, 'removeFromFavorites']);
    Route::get('/favorites', [FavoriteController::class, 'showFavoritesPage']);
});

Route::get('/movie/{movieId}/check-favorite', [FavoriteController::class, 'checkFavorite']);

Route::middleware('auth')->get('/recommendations', [RecommendationController::class, 'recommend'])->name('movies.recommend');

Route::get('/info', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


require __DIR__.'/auth.php';
