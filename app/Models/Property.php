<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\Translatable;

class Property extends Model
{
    use HasFactory, SoftDeletes, Translatable;

    protected $fillable = ['name', 'name_en'];

    public function options()
    {
        return $this->hasMany(PropertyOption::class);
    }

    public function items()
    {
        return $this->belongsToMany(PropertyOption::class);
    }

}
