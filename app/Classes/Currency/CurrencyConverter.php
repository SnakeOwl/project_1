<?php

namespace App\Classes\Currency;

use App\Models\Currency;
use Carbon\Carbon;
use Illuminate\Support\Facades\Schema;

class CurrencyConverter
{
    // код основной валюты, по которой происходит поиск в БД
    const DEFAULT_CURRENCY_CODE = 'RUB';

    // here all records where key - is symbol
    protected static $container; // с этим удобно работать в этом классе
    // here `id` - is key
    protected static $normalContainer; // с этим удобно работать во фронте

    public static function loadContainter()
    {
        // Если не проверять на наличие таблицы, то даже php artisan migrate не запускает.
        if ( Schema::hasTable('currencies') && is_null(self::$container))
        {
            self::$normalContainer = Currency::get();

            foreach(self::$normalContainer as $currency)
                self::$container[$currency->code] = $currency;
        }
    }

    public static function getCurrencies()
    {
        self::loadContainter();

        return self::$normalContainer;
    }

    public static function convert($sum, $originCurrencyCode=self::DEFAULT_CURRENCY_CODE, $targetCurrencyCode = null): float
    {
        self::loadContainter();

        $originCurrency = self::$container[$originCurrencyCode];

        if (is_null($targetCurrencyCode))
        {
            $targetCurrencyCode = self::getCurrencyCodeFromSession();
        }
        $targetCurrency = self::$container[$targetCurrencyCode];

        $today = Carbon::now()->startOfDay();
        if ($originCurrency->rate == 0 || $originCurrency->updated_at->startOfDay() != $today ||
            $targetCurrency->rate == 0 || $targetCurrency->updated_at->startOfDay() != $today )
        {
            CurrencyRates::getRates();
            self::loadContainter();
            $originCurrency = self::$container[$originCurrencyCode];
            $targetCurrency = self::$container[$targetCurrencyCode];
        }

        return $sum / $originCurrency->rate * $targetCurrency->rate;
    }

    public static function getCurrencyCodeFromSession()
    {
        return session('currency', 'RUB');

        return "RUB";
    }

    public static function getCurrentCurrencyFromSession()
    {
        self::loadContainter();

        foreach(self::$container as $currency)
            if ($currency->code === self::getCurrencyCodeFromSession())
                return $currency;
    }

    public static function getCurrentCurrency()
    {
        self::loadContainter();
        // dd(self::getCurrencyCodeFromSession());
        return self::$container[self::getCurrencyCodeFromSession()];
    }

    public static function getBaseCurrency()
    {
        self::loadContainter();

        foreach (self::$container as $code => $currency)
            if ($currency->isMain())
                return $currency;

        throw new LogicException('Main currency is not defined.');
    }
}
