<?php

namespace App\Repositories;

use App\Models\Movie;
use App\Repositories\QueryBuilder\MovieQueryBuilder;
use Illuminate\Database\Eloquent\Collection;

class MovieRepository extends AbstractRepository
{
    protected function getModelClass(): string
    {
        return Movie::class;
    }

    public function getAll(): Collection
    {
        return $this
            ->query()
            ->withRelations(['genres'])
            ->orderBy('popularity', 'desc')
            ->get();
    }

    public function query(): MovieQueryBuilder
    {
        return new MovieQueryBuilder();
    }

    public function findById($id)
    {
        return Movie::with('genres')->find($id);  // Используем метод findById из MovieQueryBuilder
    }

    public function getRecommendedMovies()
    {
        // Сортируем фильмы по популярности (можно добавить другие критерии)
        return Movie::orderBy('popularity', 'desc')
            ->take(4)  // Ограничиваем количество фильмов
            ->get();
    }
}

