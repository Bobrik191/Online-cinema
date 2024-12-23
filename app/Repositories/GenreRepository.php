<?php

namespace App\Repositories;

use App\Models\Genre;

class GenreRepository extends AbstractRepository
{
    protected function getModelClass(): string
    {
        return Genre::class;
    }
}
