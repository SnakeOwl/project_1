<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\Translatable;

class Category extends Model
{
    use HasFactory, Translatable;

    public $timestamps = false;

    public function getName()
    {
        return  $this->__('name');
    }

    protected $fillable = [
        'name',
        'name_en',
        'alias',
        'id_parent'
    ];
}
