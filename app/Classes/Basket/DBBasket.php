<?php

namespace App\Classes\Basket;

use Illuminate\Support\Str;

use App\Models\Basket;
use App\Models\Offer;
use App\Models\Order;
use App\Models\User;

// Корзина на БД. Изменение количества предложений происходит сразу, при манипуляции с корзиной.
class DBBasket
{
    protected $basket;

    public function __construct($bKey=null)
    {
        $this->basket = $bKey !== null
            ? Basket::byKey($bKey)
            : Basket::create([
                'key' => Str::random(64),
                'price' => 0, 
            ]);
    }

    public function isEmpty(): bool
    {
        return $this->basket->offers()->count() === 0;
    }


    public function getBasket(): Basket
    {
        /*
            Если апдейтить при удалении/добавлении оффера, 
            то не видно только что добавленный/удаленный оффер.
            Из-за этого цена не правильная.
        */ 
        $this->updatePrice();

        return $this->basket;
    }

    public function getKey(): string
    {
        return $this->basket->key;
    }

    public function addOffer(Offer $offer)
    {
        if ($offer->count == 0)
            return 'no more offers';

        if($this->basket->offers->contains($offer))
        {
            $pivotRow = $this->basket->offers->find($offer->id)->pivot;

            $this->basket->offers()->updateExistingPivot($offer->id ,[
                'count' => $pivotRow->count +1
            ]);

            $offer->update(['count' => $offer->count -1]);
        }else
        {
            $offer->update(['count' => $offer->count-1]);
            $this->basket->offers()->attach($offer, ['count' => 1]);
        }

        return "offer added to basket";
    }

    public function removeOffer(Offer $offer)
    {
        if($this->basket->offers->contains($offer))
        {
            $pivotRow = $this->basket->offers->find($offer->id)->pivot;

            if ($pivotRow->count > 1)
            {
                $this->basket->offers()->updateExistingPivot($offer->id ,[
                    'count' => $pivotRow->count -1
                ]);
            }else
            {
                $this->basket->offers()->detach($offer->id);
            }

            $offer->update(['count' => $offer->count +1]);
        }
        $this->updatePrice();

        return "offer removed from basket";
    }

    public function storeOrder($params): int
    {
        $this->updatePrice();
        $params['currency_id'] = 1;
        $params['price'] = $this->basket->price;

        if (isset($params['email']))
        {
            $user = User::byEmail($params['email'])->first();

            if ($user !== null)
                $params['user_id'] = $user->id;
        }

        $order = Order::create($params);

        return $order->id;
    }

    public function updatePrice(): bool
    {
        $this->basket->update([
            'price' => $this->getFullPrice(),
        ]);

        return true;
    }
    
    public function getFullPrice(): float
    {
        $result = 0;
        $this->basket->offers;
        
        $mul = $this->basket->offers->map(function ($offer){
            return ($offer->price * $offer->pivot->count);
        });

        foreach ($mul as $multiply)
            $result += $multiply;
        
        return $result;
    }
}