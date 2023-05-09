<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\belongsToMany;

// Модель для использования корзины через БД
class Basket extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'key',
        'status',
        'price',
    ];

    //The model's default values for attributes.
    protected $attributes = [
        'status' => 'just created',
    ];

    public function scopeByKey($query, $key)
    {
        return $query->where('key', $key)->first();
    }

    public function offers(): belongsToMany
    {
        return $this->belongsToMany(Offer::class)->withPivot('count');
    }
}
