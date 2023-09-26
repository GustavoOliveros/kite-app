<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Service;
use App\Models\User;

class User_Has_Service extends Model
{
    use HasFactory;

    protected $table = 'user_has_service';

    protected $primaryKey = ['user_id', 'service_id'];

    protected $fillable = ['user_id' , 'service_id'];

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id', 'id');
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
