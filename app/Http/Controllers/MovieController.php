<?php

namespace App\Http\Controllers;

use App\Repositories\MovieRepository;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Movie;
use App\Models\MovieView;
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
        $movie = Movie::find($id);

        $genreIds = $movie->genres->pluck('id');

        $recommendedMovies = Movie::whereHas('genres', function ($query) use ($genreIds) {
            $query->whereIn('genres.id', $genreIds);
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

    public function recommend()
    {
        $user = Auth::user();

        // Отримати всі жанри, пов’язані з переглянутими фільмами
        $viewedGenres = MovieView::where('user_id', $user->id)
            ->with('movie.genres')
            ->get()
            ->flatMap(fn($view) => $view->movie->genres->pluck('id'))
            ->countBy()
            ->sortDesc();

        if ($viewedGenres->isEmpty()) {
            // Якщо немає історії переглядів, повертаємо найпопулярніші фільми
            $recommendedMovies = Movie::orderBy('popularity', 'desc')->take(10)->get();
        } else {
            // Рекомендуємо фільми за жанрами
            $recommendedMovies = Movie::whereHas('genres', function ($query) use ($viewedGenres) {
                $query->whereIn('genres.id', $viewedGenres->keys());
            })
                ->whereDoesntHave('views', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->orderBy('popularity', 'desc')
                ->take(10)
                ->get();
        }

        return Inertia::render('Recommendations', [
            'movies' => $recommendedMovies,
        ]);
    }
}
