<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasMany;
use Illuminate\Database\Eloquent\Relations\belongsTo;

class Shape extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'category_id',
        'name',
        'name_en',
        'global',
    ];

    public function options(): hasMany
    {
        return $this->hasMany(ShapeOption::class);
    }
    public function shapeOptions(): hasMany
    {
        return $this->hasMany(ShapeOption::class);
    }

    public function category(): belongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
