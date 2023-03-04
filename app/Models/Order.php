<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Classes\Currency\CurrencyConverter;

class Order extends Model
{
    use HasFactory;

    public $fillable = [
        'payment_status',
        'status',
        'price',
        'payment_method',
        'delivery_method',
        'address',
        'post_index',
        'phone',
        'name',
        'storage_id',
        'currency_id',
        'user_id',
        'date_delivered',
    ];

    //The model's default values for attributes.
    protected $attributes = [
        'status' => 'Обрабатывается',
        'payment_status' => 0,
        'payment_method' => 'Способ оплаты не выбран',
        'delivery_method' => 'Способ доставки не выбран',
        'phone' => 'Телефон не задан',
        'currency_id' => 1,
    ];

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => date_format(date_create($value), 'Y-m-d H:i:s'),
        );
    }

    protected function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => date_format(date_create($value), 'Y-m-d H:i:s'),
        );
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    public function storage(): BelongsTo
    {
        return $this->belongsTo(Storage::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function promocode(): BelongsTo
    {
        return $this->belongsTo(Promocode::class);
    }

    public function offers(): BelongsToMany
    {
        return $this->belongsToMany(Offer::class)->withPivot(['count', 'price']);
    }

    public function scopeActive($query)
    {
        return $query->whereNull('date_delivered');
    }


    // return full price of the current order
    public function get_full_price()
    {
        $sum = 0;
        foreach ($this->offers as $offer)
            $sum += $offer->price * $offer->countInOrder;

        return $sum;
    }

    public function customStore($params)
    {
        $params['currency_id'] = CurrencyConverter::getCurrentCurrencyFromSession()->id;
        $params['price'] = $this->get_full_price();

        $order = $this->create($params);

        foreach($this->offers as $offerInOrder)
            $order->offers()->attach($offerInOrder, [
                'count' => $offerInOrder->countInOrder,
                'price' => $offerInOrder->price,
            ]);

        return true;
    }
}
