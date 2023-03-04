<?php

namespace App\Classes\Basket;

use App\Models\Order;
use App\Models\Item;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderCreated;
use App\Classes\Currency\CurrencyConverter;


class Basket
{
    // Пока товар в корзине, запросов в БД не происходит.
    // всё храниться во временном заказе привязанном к сессии
    protected $order;

    public function __construct($createOrder = false)
    {
        $order = session('order');
        if ( is_null($order) && $createOrder)
        {
            $data  = array();
            if (Auth::check())
                $data['user_id'] = Auth::id();

            $this->order = new Order($data);

            session(['order' => $this->order]);
        }else
        {
            $this->order = $order;
        }
    }

    public function addOffer(Offer $offer)
    {
        if ($offer->count == 0)
        {
            return __('info.offer no have count');
        }

        if($this->order->offers->contains($offer))
        {
            $pivotRow = $this->order->offers->where('id', $offer->id)->first();
            if ($pivotRow->count > $pivotRow->countInOrder)
                $pivotRow->countInOrder++;
            else
                return __('info.item is not available');

        }else
        {
            $offer->countInOrder = 1;
            $this->order->offers->put($offer->id, $offer);
        }

        return __('info.item added');
    }

    // выполняет пересчет доступных товаров в БД, если необходимо
    public function countAvailable($update_count = false)
    {
        $offers = collect([]);
        foreach ($this->order->offers as $offer)
        {
            $DBoffer = Offer::findOrFail($offer->id);
            if ($DBoffer->count < $offer->countInOrder)
            {
                session()->forget('order');
                return false;
            }

            if ($update_count)
            {
                $DBoffer->count -= $offer->countInOrder;
                $offers->push($DBoffer);
            }
        }

        if ($update_count)
            $offers->map->save();

        return true;
    }

    public function storeOrder($params)
    {
        if (!$this->countAvailable(true))
            return false;

        $params['user_id'] = Auth::check()? Auth::user()->id: null;
        
        $this->order->customStore($params);

        $email = Auth::check() ? Auth::user()->email: $params['email'];
        Mail::to($email)->send(new OrderCreated($this->getOrder()));

        return true;
    }

    public function getOrder()
    {
        return $this->order;
    }

    public function removeOffer(Offer $offer)
    {
        if($this->order->offers->contains($offer))
        {
            $pivotRow = $this->order->offers->where('id', $offer->id)->first();

            if($pivotRow->countInOrder === 1)
                $this->order->offers->pull($offer->id);
            else
                $pivotRow->countInOrder--;
        }
    }
}
