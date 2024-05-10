<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OneClickForm extends Model
{
    use HasFactory;


    public $fillable = [
        "phone",
        "name",
        "offer_id",
    ];
}
