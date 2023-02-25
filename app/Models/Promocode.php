<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\belongsTo;
use Illuminate\Database\Eloquent\Relations\hasMany;
use Illuminate\Database\Eloquent\Factories\hasFactory;
use Illuminate\Database\Eloquent\Model;

class Promocode extends Model
{
    use HasFactory;



    public function currency(): belongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    public function orders(): hasMany
    {
        return $this->hasMany(Order::class);
    }

}
