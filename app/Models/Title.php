<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Title_On_Service;
use App\Models\Title_Has_Genre;
use App\Models\Genre;

class Title extends Model
{
    use HasFactory;

    protected $table = 'titles';
    protected $fillable = [
        'type',
        'original_title',
        'title',
        'year',
        'poster_path',
        'backdrop_path',
        'status',
        'overview',
        'disabled_at',
        'reason',
    ];

    public function services(){
        return $this->hasMany(Title_On_Service::class, "title_id", "id");
    }

    public function genres(){
        return $this->hasMany(Title_Has_Genre::class, "title_id", "id");
    }

    public function genresDirect()
    {
        return $this->belongsToMany(Genre::class, 'Title_Has_Genre', 'title_id', 'genre_id');
    }
}
