<?php

namespace App\Console\Commands;

use App\Models\Movie;
use App\Services\TMDBApiService;
use Illuminate\Console\Command;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class FillMoviesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fill-movies';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fill movies with trailers from API';

    /**
     * Execute the console command.
     * @throws ConnectionException
     */
    public function handle(
        TMDBApiService $service,
    ): void
    {
        $popular = $service->getPopularMovies();
        $topRated = $service->getTopRatedMovies();
        $upcoming = $service->getUpcomingMovies();

        $movies = [...$popular, ...$topRated, ...$upcoming];

        $moviesToInsert = [];
        $genres = [];

        foreach ($movies as $movie) {
            $moviesToInsert[] = [
                'title' => $movie['title'],
                'description' => $movie['overview'],
                'popularity' => $movie['popularity'],
                'poster_path' => config('movies_api.image_url') . $movie['poster_path'],
                'release_date' => $movie['release_date'],
                'vote_average' => $movie['vote_average'],
                'vote_count' => $movie['vote_count'],
                'video_links' => json_encode(array_map(function($video) {
                    return $video['key'];
                }, $service->getMovieTrailers($movie['id']))),
            ];

            $genres[] = $movie['genre_ids'];
        }

        $moviesToInsert = collect($moviesToInsert)->unique('title');

        DB::table('movies')->insert($moviesToInsert->toArray());

        /** @var Collection<Movie> $movies */
        $movies = Movie::query()->get();

        foreach ($movies as $key => $movie) {
            $movie->genres()->attach($genres[$key]);
        }
    }
}
