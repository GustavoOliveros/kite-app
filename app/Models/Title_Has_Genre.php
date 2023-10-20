<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Title;
use App\Models\Genre;

class Title_Has_Genre extends Model
{
    use HasFactory;

    protected $table = 'title_has_genre';

    protected $primaryKey = 'id';

    protected $fillable = ['genre_id, title_id'];

    public function genre()
    {
        return $this->belongsTo(Genre::class, 'genre_id', 'id');
    }
    public function title()
    {
        return $this->belongsTo(Title::class, 'title_id', 'id');
    }
}
