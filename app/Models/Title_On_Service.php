<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Service;
use App\Models\Title;

class Title_On_Service extends Model
{
    use HasFactory;

    protected $table = 'title_on_service';

    protected $primaryKey = 'title_id,service_id';

    protected $fillable = ['title_id' , 'service_id', 'quality', 'link', 'leaving', 'available_since'];

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id', 'id');
    }
    public function title()
    {
        return $this->belongsTo(Title::class, 'title_id', 'id');
    }
}
