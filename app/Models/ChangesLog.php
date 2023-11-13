<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChangesLog extends Model
{
    use HasFactory;

    protected $table = 'changeslog';
    protected $fillable = [
        'type',
        'body'
    ];
}
