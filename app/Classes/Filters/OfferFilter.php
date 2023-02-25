<?php

namespace App\Classes\Filters;

use Illuminate\Database\Eloquent\Builder;
use App\Models\Order;
use App\Models\Item;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderCreated;
use App\Classes\Currency\CurrencyConverter;

class OfferFilter extends Filter
{
    public const CATEGORY = 'categy';
    public const PRICE_FROM = 'priceFrom';
    public const PRICE_TO = 'priceTo';
    public const IS_NEW = "isNew";
    public const IS_POPULAR = "isPopular";

    protected $used_category;

    public function __constructor()
    {
        $this->used_category = session('used_category') ?? null;
    }

    /*
        Возвращает массив.
        В массиве описаны именя идущие с формы и соответственно имена функций на их обработку.
    */
    protected function getCallbacks():array
    {
        return [
            self::CATEGORY => [$this, 'category'],
            self::PRICE_FROM => [$this, 'priceFrom'],
            self::PRICE_TO => [$this, 'priceTo'],
            self::IS_NEW => [$this, 'isNew'],
            self::IS_POPULAR => [$this, 'isPopular'],
        ];
    }

    // ---- функции на обработку приходящих полей
    public function category(Builder $builder, $value)
    {
        $builder->where('category_id', $value);
    }

    public function priceTo(Builder $builder, $value)
    {
        // Если пользователь укажет фильтр по цене в иностранной валюте.
        // Нужен перевод в рубли, так как это основная валюта и по ней ведётся поиск в БД.
        if (CurrencyConverter::getCurrencyCodeFromSession() != CurrencyConverter::DEFAULT_CURRENCY_CODE){
            $value = CurrencyConverter::convert($value,
                CurrencyConverter::getCurrencyCodeFromSession(),
                CurrencyConverter::DEFAULT_CURRENCY_CODE);
        }

        $builder->where('price', '<=', $value);
    }

    public function priceFrom(Builder $builder, $value)
    {
        // Если пользователь укажет фильтр по цене в иностранной валюте.
        // Нужен перевод в рубли, так как это основная валюта и по ней ведётся поиск в БД.
        if (CurrencyConverter::getCurrencyCodeFromSession() != CurrencyConverter::DEFAULT_CURRENCY_CODE){
            $value = CurrencyConverter::convert($value,
                CurrencyConverter::getCurrencyCodeFromSession(),
                CurrencyConverter::DEFAULT_CURRENCY_CODE);
        }

        $builder->where('price', '>=', $value);
    }

    public function isNew(Builder $builder, $value)
    {
        if ( filter_var($value, FILTER_VALIDATE_BOOLEAN) )
        {
            $builder->whereHas('item', function(Builder $query) {
                $query->where('new', 1);
            });
        }
    }

    public function isPopular(Builder $builder, $value)
    {
        if ( filter_var($value, FILTER_VALIDATE_BOOLEAN) )
        {
            $builder->whereHas('item', function(Builder $query) {
                $query->where('hit', 1);
            });
        }

    }
    // функции на обработку приходящих полей ----

    public function getUsedCategory()
    {
        return $this->used_category;
    }

    public function old_filter($params)
    {

        $offerQuery = Offer::with('item', 'item.category');
        return $offerQuery;

        $this->used_category = session('used_category') ?? null;

        // работает либо фильтр, либо поисковик по имени
        if($params->filled('search'))
        {
            //либо работает поисковик
            $offerQuery->whereHas('item', function ($query) use ($params){
                $query->where('name', 'LIKE', '%'.$params->search.'%');
            });
        }
        else
        {
            if (isset($category_alias))
            {
                $offerQuery->whereHas('item.category', function ($query) use ($category_alias){
                    $query->where('alias', $category_alias);
                } );
                $currentCategory = $category_alias;
            }
            elseif ($params->has('category_alias'))
            {
                $offerQuery->whereHas('item.category', function ($query) use ($category_alias){
                    $query->where('alias', $category_alias);
                } );
                $currentCategory = $params->category_alias;
            }

            if ($params->filled('price_from'))
            {
                $offerQuery->where('price', '>=', $params->price_from);
            }

            if ($params->filled('price_to'))
            {
                $offerQuery->where('price', '<=', $params->price_to);
            }

            foreach(['hit', 'new'] as $field)
            {
                if($params->has($field))
                {
                    $offerQuery->whereHas('item', function ($query) use ($field){
                        $query->where($field, 1);
                    });
                }
            }
        }

        return $offerQuery;
    }
}
