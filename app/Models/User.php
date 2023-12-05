<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use App\Models\User_Has_Service;
use App\Models\User_Has_Title;
use App\Models\Playlist;
use App\Models\Title;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'profile_path',
        'disabled_at',
        'reason',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function suggestedTitles(){
        return $this->hasMany(Title::class, 'user_id', 'id');
    }

    public function reviews(){
        return $this->hasMany(Review::class, 'user_id', 'id');
    }

    public function services(){
        return $this->hasMany(User_Has_Service::class, "user_id", "id");
    }

    public function servicesDirect(){
        return $this->belongsToMany(Service::class, 'user_has_service', 'user_id', 'service_id');
    }

    public function titles(){
        return $this->hasMany(User_Has_Title::class, "user_id", "id");
    }

    public function playlists(){
        return $this->hasMany(Playlist::class, "user_id", "id");
    }

    public function watchedTitles(){
        return $this->belongsToMany(Title::class, 'User_Views_Title', 'user_id', 'title_id');
    }

    public function titleReminder(){
        return $this->belongsToMany(Title::class, 'Reminders', 'user_id', 'title_id');
    }

}
