<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Movie;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RecommendationController extends Controller
{
    public function recommend()
    {
        $user = Auth::user();

        $favorites = $user->favorites()->with('movie')->get();

        if ($favorites->isEmpty()) {
            return response()->json(['message' => 'No favorite movies found.'], 404);
        }

        $genreIds = $favorites->flatMap(function ($favorite) {
            return $favorite->movie->genres->pluck('id');
        })->unique();

        if ($genreIds->isEmpty()) {
            return response()->json(['message' => 'No genres found for favorite movies.'], 404);
        }

        $recommendedMovies = Movie::select('movies.*')
            ->join('movies_genres', 'movies.id', '=', 'movies_genres.movie_id')
            ->join('genres', 'genres.id', '=', 'movies_genres.genre_id')
            ->whereIn('genres.id', $genreIds)
            ->whereNotIn('movies.id', $favorites->pluck('movie_id'))
            ->limit(5)
            ->get();

        if ($recommendedMovies->isEmpty()) {
            return response()->json(['message' => 'No recommended movies found.'], 404);
        }

        return Inertia::render('Recommendations', [
            'movies' => $recommendedMovies,
        ]);
    }
}
