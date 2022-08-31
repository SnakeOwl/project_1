<?php
namespace App\Classes;

use App\Models\Order;
use App\Models\Item;
use App\Models\Sku;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderCreated;
use App\Services\CurrencyConverter;

class Basket
{
    protected $order;

    public function __construct($createOrder = false)
    {
        $order = session('order');
        if ( is_null($order) && $createOrder)
        {
            $data  = array();
            if (Auth::check())
            {
                $data['user_id'] = Auth::id();
            }

            $this->order = new Order($data);

            session(['order' => $this->order]);
        }else
        {
            $this->order = $order;
        }
    }

    public function addSku(Sku $sku)
    {
        if($this->order->skus->contains($sku))
        {
            $pivotRow = $this->order->skus->where('id', $sku->id)->first();
            if ($pivotRow->count > $pivotRow->countInOrder)
            {
                $pivotRow->countInOrder++;
            }else
            {
                return __('info.item is not available');
            }
        }else
        {
            $sku->countInOrder = 1;
            $this->order->skus->put($sku->id, $sku);
        }

        return __('info.item added');
    }

    // выполняет пересчет доступных товаров в БД, если необходимо
    public function countAvailable($update_count = false)
    {
        $skus = collect([]);
        foreach ($this->order->skus as $sku)
        {
            $DBsku = Sku::findOrFail($sku->id);

            if ($DBsku->count < $sku->countInOrder)
            {
                session()->forget('order');
                return false;
            }

            if ($update_count)
            {
                $DBsku->count -= $sku->countInOrder;
                $skus->push($DBsku);
            }
        }

        if ($update_count) {
            $skus->map->save();
        }

        return true;
    }

    public function storeOrder($params)
    {
        if (!$this->countAvailable(true))
            return false;

        $this->order->save_order($params);

        $email = Auth::check() ? Auth::user()->email: $params['email'];
        Mail::to($email)->send(new OrderCreated($this->getOrder()));

        return true;
    }

    public function getOrder()
    {
        return $this->order;
    }

    public function removeSku(Sku $sku)
    {
        if($this->order->skus->contains($sku))
        {
            $pivotRow = $this->order->skus->where('id', $sku->id)->first();

            if($pivotRow->countInOrder === 1)
            {
                $this->order->skus->pull($sku->id);
            }else
            {
                $pivotRow->countInOrder--;
            }
        }
    }


}
