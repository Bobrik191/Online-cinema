<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Movie extends Model
{
    protected $fillable = [
        'title',
        'description',
        'popularity',
        'poster_path',
        'release_date',
        'vote_average',
        'vote_count',
        'video_links',
    ];

    protected $casts = [
        'release_date' => 'datetime',
        'video_links' => 'array',
    ];

    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(
            Genre::class,
            'movies_genres',
            'movie_id',
            'genre_id',
            relatedKey: 'genre_id'
        );
    }
}
