<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Title;

class Genre extends Model
{
    use HasFactory;

    protected $table = 'genres';
    protected $fillable = [
        'name',
    ];

    public function titles()
    {
        return $this->belongsToMany(Title::class, 'Title_Has_Genre', 'genre_id', 'title_id');
    }
}
