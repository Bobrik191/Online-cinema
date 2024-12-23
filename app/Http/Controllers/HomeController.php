<?php

namespace App\Http\Controllers;

use App\Repositories\MovieRepository;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        private readonly MovieRepository $movieRepository,
    ) {
    }

    public function index(): Response
    {
        $movies = $this->movieRepository->getAll();

        return Inertia::render('Homepage', [
            'movies' => $movies,
        ]);
    }
}
