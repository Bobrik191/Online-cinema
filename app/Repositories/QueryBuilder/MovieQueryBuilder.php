<?php

namespace App\Repositories\QueryBuilder;

use App\Models\Movie;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class MovieQueryBuilder
{
    private Builder $query;

    public function __construct()
    {
        $this->query = Movie::query();
    }

    public function withRelations(array $relations): self
    {
        $this->query->with($relations);

        return $this;
    }

    public function orderBy(string $field, string $direction = 'asc'): self
    {
        $this->query->orderBy($field, $direction);

        return $this;
    }

    public function get(): Collection
    {
        return $this->query->get();
    }

    public function findById($id)
    {
        return $this->where('id', $id)->first();  // Ищем фильм по ID
    }
}
