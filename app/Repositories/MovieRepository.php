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
}

