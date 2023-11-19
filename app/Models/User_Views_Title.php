<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Service;
use App\Models\Title;

class User_Views_Title extends Model
{
    use HasFactory;

    protected $table = 'user_views_title';

    protected $primaryKey = 'id';

    protected $fillable = ['user_id' , 'title_id', 'view_count'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function title()
    {
        return $this->belongsTo(Title::class, 'title_id', 'id');
    }
    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id', 'id');
    }


}
