<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parameter extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'item_id',
        'param_name',
        'param_value',
    ];
    protected $hidden = ['id', 'item_id'];

    protected $table = "parameters";
}
