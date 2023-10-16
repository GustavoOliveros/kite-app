<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Title;

class User_Has_Title extends Model
{
    use HasFactory;

    protected $table = 'user_has_title';

    protected $primaryKey = 'id';

    protected $fillable = ['user_id' , 'title_id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function title()
    {
        return $this->belongsTo(Title::class, 'title_id', 'id');
    }

}
