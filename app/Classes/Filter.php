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
use App\Http\Requests\FilterRequest;


class Filter
{
    protected $used_category;

    function __constructor()
    {
        $this->used_category = session('used_category') ?? null;
    }

    public function getUsedCategory()
    {
        return $this->used_category;
    }

    public function filter(FilterRequest $request)
    {
        $params = $request->safe();
        $skuQuery = Sku::with('item', 'item.category');
        $this->used_category = session('used_category') ?? null;

        // работает либо фильтр, либо поисковик по имени
        if($request->filled('search'))
        {
            //либо работает поисковик
            $skuQuery->whereHas('item', function ($query) use ($request){
                $query->where('name', 'LIKE', '%'.$request->search.'%');
            });
        }
        else
        {
            if (isset($category_alias))
            {
                $skuQuery->whereHas('item.category', function ($query) use ($category_alias){
                    $query->where('alias', $category_alias);
                } );
                $currentCategory = $category_alias;
            }
            elseif ($request->has('category_alias'))
            {
                $skuQuery->whereHas('item.category', function ($query) use ($category_alias){
                    $query->where('alias', $category_alias);
                } );
                $currentCategory = $request->category_alias;
            }

            if ($request->filled('price_from'))
            {
                $skuQuery->where('price', '>=', $request->price_from);
            }

            if ($request->filled('price_to'))
            {
                $skuQuery->where('price', '<=', $request->price_to);
            }

            foreach(['hit', 'new'] as $field)
            {
                if($request->has($field))
                {
                    $skuQuery->whereHas('item', function ($query) use ($field){
                        $query->where($field, 1);
                    });
                }
            }
        }

        return $skuQuery;
    }
}
