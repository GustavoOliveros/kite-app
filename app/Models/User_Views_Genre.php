<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Genre;

class User_Views_Genre extends Model
{
    use HasFactory;

    protected $table = 'user_views_genre';

    protected $primaryKey = 'id';

    protected $fillable = ['user_id' , 'genre_id', 'view_count'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class, 'genre_id', 'id');
    }
}
