<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Title;

class Service extends Model
{
    use HasFactory;

    protected $table = 'services';
    protected $fillable = [
        'name',
        'id_name',
        'homepage',
        'logo_path',
        'price',
    ];

    public function titles()
    {
        return $this->belongsToMany(Title::class, 'Title_On_Service', 'service_id', 'title_id');
    }
}
