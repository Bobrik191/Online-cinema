<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Http;

class TMDBApiService
{
    /**
     * @throws ConnectionException
     */
    public function getGenres(): array
    {
        return Http::withHeaders([
            'Authorization' => 'Bearer ' . config('movies_api.api_key'),
        ])
            ->get(config('movies_api.api_url') . '/genre/movie/list')
            ->json()['genres'];
    }

    /**
     * @throws ConnectionException
     */
    public function getPopularMovies(): array
    {
        return Http::withHeaders([
            'Authorization' => 'Bearer ' . config('movies_api.api_key'),
        ])
            ->get(config('movies_api.api_url') . '/movie/popular')
            ->json()['results'];
    }

    /**
     * @throws ConnectionException
     */
    public function getMovieTrailers(int $movieId): array
    {
        return Http::withHeaders([
            'Authorization' => 'Bearer ' . config('movies_api.api_key'),
        ])
            ->get(config('movies_api.api_url') . '/movie/' . $movieId . '/videos')
            ->json()['results'];
    }

    /**
     * @throws ConnectionException
     */
    public function getTopRatedMovies(): array
    {
        return Http::withHeaders([
            'Authorization' => 'Bearer ' . config('movies_api.api_key'),
        ])
            ->get(config('movies_api.api_url') . '/movie/top_rated')
            ->json()['results'];
    }

    /**
     * @throws ConnectionException
     */
    public function getUpcomingMovies(): array
    {
        return Http::withHeaders([
            'Authorization' => 'Bearer ' . config('movies_api.api_key'),
        ])
            ->get(config('movies_api.api_url') . '/movie/upcoming')
            ->json()['results'];
    }
}
