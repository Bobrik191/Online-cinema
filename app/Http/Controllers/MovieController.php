<?php

namespace App\Http\Controllers;

use App\Repositories\MovieRepository;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\MovieView; // Не забудьте подключить модель MovieView
use Illuminate\Support\Facades\Auth;

class MovieController extends Controller
{
    protected $movieRepository;

    public function __construct(MovieRepository $movieRepository)
    {
        $this->movieRepository = $movieRepository;
    }

    public function show($id)
    {
        // Получаем фильм по ID
        $movie = Movie::find($id);

        // Получаем жанры текущего фильма (массив идентификаторов жанров)
        $genreIds = $movie->genres->pluck('id'); // Плоский список ID жанров

        // Получаем фильмы с хотя бы одним совпадающим жанром (исключая текущий фильм)
        $recommendedMovies = Movie::whereHas('genres', function ($query) use ($genreIds) {
            $query->whereIn('genres.id', $genreIds); // Фильмы с хотя бы одним совпадающим жанром
        })
            ->where('id', '!=', $id)
            ->limit(4)
            ->get();

        $user = Auth::user();
        if ($user) {
            MovieView::create([
                'user_id' => $user->id,
                'movie_id' => $movie->id,
                'viewed_at' => now(),
            ]);
        }

        return Inertia::render('Movie', [
            'movie' => $movie,
            'recommendedMovies' => $recommendedMovies,
        ]);
    }


}
