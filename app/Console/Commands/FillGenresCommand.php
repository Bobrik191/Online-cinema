<?php

namespace App\Console\Commands;

use App\Repositories\GenreRepository;
use App\Services\TMDBApiService;
use Illuminate\Console\Command;
use Illuminate\Http\Client\ConnectionException;

class FillGenresCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app-one-time:fill-genres';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fill genres from API';

    /**
     * Execute the console command.
     * @throws ConnectionException
     * @throws \Exception
     */
    public function handle(
        TMDBApiService $service,
        GenreRepository $genreRepository,
    ): void
    {
        $genres = $service->getGenres();
        foreach ($genres as $genre) {
            $genreRepository->create([
                'name' => $genre['name'],
                'genre_id' => $genre['id'],
            ]);
        }
    }
}
