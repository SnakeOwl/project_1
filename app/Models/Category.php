<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\hasMany;
use App\Models\Traits\Translatable;

class Category extends Model
{
    use HasFactory, Translatable;

    public $timestamps = false;

    // old style
    public function getName()
    {
        return  $this->__('name');
    }

    protected $fillable = [
        'name',
        'name_en',
        'alias',
    ];

    public function shapes(): hasMany
    {
        return $this->hasMany(Shape::class);
    }

    public function items(): hasMany
    {
        return $this->hasMany(Item::class);
    }
}
