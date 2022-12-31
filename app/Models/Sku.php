<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Services\CurrencyConverter;
use App\Models\Traits\Filterable;

class Sku extends Model
{
    use HasFactory, SoftDeletes, Filterable;

    protected $fillable = ['item_id','count', 'price'];

    protected $hidden = [
        'created_at',
        'deleted_at',
        'updated_at',
        'item_id'
    ];

    public function get_price_for_count()
    {
        if (!is_null ($this->pivot))
            return $this->price * $this->pivot->count;

        return $this->price;
    }


    public function scopeAvailable($query)
    {
        return $query->where('count', '>', 0);
    }

    public function isAvailable(): bool
    {
        return ($this->count > 0) && !$this->item->trashed();
    }


    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function propertyOptions()
    {
        return $this->belongsToMany(PropertyOption::class, 'sku_property_option')->withTimestamps();
    }


    public function getPriceAttribute($value): float
    {
        return round(CurrencyConverter::convert($value), 2);
    }

    public function getItemNameAttribute($value): string
    {
        return $this->item->name;
    }
}
