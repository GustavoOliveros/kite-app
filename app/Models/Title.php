<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Title_On_Service;

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
        'availability_status',
        'overview',
        'disabled_at',
        'reason',
    ];

    public function services(){
        return $this->hasMany(Title_On_Service::class, "title_id", "id");
    }
}
