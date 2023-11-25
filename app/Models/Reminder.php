<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Title;
use App\Models\Service;

class Reminder extends Model
{
    use HasFactory;

    protected $table = 'reminders';
    protected $fillable = [
        'title_id',
        'user_id',
        'service_id',
        'status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function title(){
        return $this->belongsTo(Title::class, 'title_id', 'id');
    }

    public function service(){
        return $this->belongsTo(Service::class, 'service_id', 'id');
    }
}
