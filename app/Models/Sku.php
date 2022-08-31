<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Services\CurrencyConverter;


class Sku extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['item_id','count', 'price'];
    // protected $visible = ['id','count','price', 'item_name'];
    // protected $guarded = ['deleted_at', 'created_at', 'updated_at', 'item_id'];
    protected $hidden = ['deleted_at', 'created_at', 'updated_at', 'item_id'];

    public function get_price_for_count()
    {
        if (!is_null ($this->pivot))
        {
            return $this->price * $this->pivot->count;
        }

        return $this->price;
    }

    public function scopeAvailable($query)
    {
        return $query->where('count', '>', 0);
    }

    public function isAvailable()
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

    public function getPriceAttribute($value)
    {
        return round(CurrencyConverter::convert($value), 2);
    }

    public function getItemNameAttribute($value)
    {
        return $this->item->name;
    }
}
