<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\belongsTo;

class Parameter extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'item_id',
        'param_name',
        'param_value',
        'param_name_en',
        'param_value_en',
    ];

    public function item(): belongsTo
    {
        return $this->belongsTo(Item::class);
    }
}
