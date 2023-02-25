<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Galery extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'offer_id',
        'url',
    ];

}
