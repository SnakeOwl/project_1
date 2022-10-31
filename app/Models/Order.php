<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use App\Services\CurrencyConverter;

class Order extends Model
{
    use HasFactory;
    public $fillable = [
        'payment_status',
        'status',
        'payment_method',
        'delivery_method',
        'address',
        'post_index',
        'phone',
        'name',
        'storage_id',
        'currency_id',
        'date_delivered',
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

    public function currency()
    {
        return $this->belongsTo(Currency::class);
    }

    public function storage()
    {
        return $this->belongsTo(Storage::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function scopeActive($query)
    {
        return $query->whereNull('date_delivered');
    }

    public function skus()
    {
        return $this->belongsToMany(Sku::class)->withPivot(['count', 'price'])->withTimestamps();
    }

    // return full price of the current order
    public function get_full_price()
    {
        $sum = 0;
        foreach ($this->skus as $sku)
        {
            $sum += $sku->price * $sku->countInOrder;
        }

        return $sum;
    }

    public function save_order($params)
    {
        $this->currency_id = (CurrencyConverter::getCurrentCurrencyFromSession())->id;
        $this->name = $params['name'];
        $this->phone = $params['phone'];
        $this->delivery_method = $params['delivery_method'];
        $this->payment_method = $params['payment_method'];
        if($params['delivery_method'] === 'Доставка курьером')
        {
            $this->address = $params['address'];
        }
        elseif($params['delivery_method'] === 'Доставка почтой')
        {
            $this->post_index = $params['post_index'];
            $this->address = $params['address'];
        }
        elseif($params['delivery_method'] === 'Доставка до точки самовывоза')
        {
            $this->storage_id = $params['storage_id'] ?? null;
        }
        $this->price = $this->get_full_price();
        $this->save();

        if (isset($params['user_id']))
        {
            $this->users()->attach($params['user_id']);
        }

        foreach($this->skus as $skuInOrder)
        {
            $this->skus()->attach($skuInOrder, [
                'count' => $skuInOrder->countInOrder,
                'price' => $skuInOrder->price,
            ]);
        }

        return true;
    }

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'status' => 'Обрабатывается',
        'payment_status' => 0,
        'payment_method' => 'Способ оплаты не выбран',
        'delivery_method' => 'Способ доставки не выбран',
        'phone' => 'Телефон не задан',
        'currency_id' => 1,
    ];
}
