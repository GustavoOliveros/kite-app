<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Playlist_Has_Title;

class Playlist extends Model
{
    use HasFactory;

    protected $table = 'playlists';
    protected $primaryKey = 'id';
    protected $fillable = [
        'title',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function titles(){
        return $this->hasMany(Playlist_Has_Title::class, "playlist_id", "id");
    }


}
