<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\belongsTo;
use Illuminate\Database\Eloquent\Relations\belongsToMany;

class ShapeOption extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'shape_id',
        'value',
        'value_en'
    ];

    public function shape(): belongsTo
    {
        return $this->belongsTo(Shape::class);
    }

    public function offers(): belongsToMany
    {
        return $this->belongsToMany(Offer::class)->withTimestamps();
    }
}
