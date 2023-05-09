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
    public const OPTIONS = 'options';
    public const PRICE_FROM = 'priceFrom';
    public const PRICE_TO = 'priceTo';
    public const IS_NEW = "isNew";
    public const IS_POPULAR = "isPopular";

    /*
        Возвращает массив.
        В массиве описаны именя идущие с формы и соответственно имена функций на их обработку.
    */
    protected function getCallbacks():array
    {
        return [
            self::OPTIONS => [$this, 'options'],
            self::PRICE_FROM => [$this, 'priceFrom'],
            self::PRICE_TO => [$this, 'priceTo'],
            self::IS_NEW => [$this, 'isNew'],
            self::IS_POPULAR => [$this, 'isPopular'],
        ];
    }



    // ---- функции на обработку приходящих полей
    public function options(Builder $builder, $array)
    {
        foreach ($array as $value)
            $builder->whereHas('options', function(Builder $query) use($value){
                $query->where('shape_option_id', $value);
            });
    }

    public function priceTo(Builder $builder, $value)
    {
        // Если пользователь укажет фильтр по цене в иностранной валюте.
        // Нужен перевод в рубли, так как это основная валюта и по ней ведётся поиск в БД.
        if (CurrencyConverter::getCurrencyCodeFromSession()
            != CurrencyConverter::DEFAULT_CURRENCY_CODE)
            {
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
        if (CurrencyConverter::getCurrencyCodeFromSession()
            != CurrencyConverter::DEFAULT_CURRENCY_CODE)
            {
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
}
