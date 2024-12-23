<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MovieView extends Model
{
    protected $fillable = ['user_id', 'movie_id', 'viewed_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function movie()
    {
        return $this->belongsTo(Movie::class);
    }
}
