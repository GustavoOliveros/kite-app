<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Title;
use App\Models\Playlist;

class Playlist_Has_Title extends Model
{
    use HasFactory;

    use HasFactory;

    protected $table = 'playlist_has_title';
    protected $primaryKey = 'id';
    protected $fillable = [
        'title_id',
        'playlist_id'
    ];

    public function title()
    {
        return $this->belongsTo(Title::class, 'title_id', 'id');
    }
    public function playlist()
    {
        return $this->belongsTo(Playlist::class, 'playlist_id', 'id');
    }
}
