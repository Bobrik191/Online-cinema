<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favorite;
use App\Models\Movie;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    public function addToFavorites($movieId)
    {
        $user = Auth::user();

        $existingFavorite = Favorite::where('user_id', $user->id)
            ->where('movie_id', $movieId)
            ->first();

        if ($existingFavorite) {
            return response()->json(['message' => 'Movie already in favorites'], 400);
        }

        $favorite = new Favorite();
        $favorite->user_id = $user->id;
        $favorite->movie_id = $movieId;
        $favorite->save();

        return response()->json(['message' => 'Movie added to favorites']);
    }

    public function removeFromFavorites($movieId)
    {
        $user = Auth::user();

        $favorite = Favorite::where('user_id', $user->id)
            ->where('movie_id', $movieId)
            ->first();

        if ($favorite) {
            $favorite->delete();
            return response()->json(['message' => 'Movie removed from favorites']);
        }

        return response()->json(['message' => 'Movie not found in favorites'], 404);
    }

    public function checkFavorite($movieId)
    {
        $user = Auth::user();

        $isFavorite = Favorite::where('user_id', $user->id)
            ->where('movie_id', $movieId)
            ->exists();

        return response()->json(['isFavorite' => $isFavorite]);
    }

    public function showFavoritesPage()
    {
        $user = Auth::user();
        $favorites = $user->favorites()->with('movie')->get();

        return Inertia::render('Favorites', [
            'favorites' => $favorites
        ]);
    }
}
