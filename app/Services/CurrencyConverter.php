<?php

namespace App\Services;

use App\Models\Currency;
use Carbon\Carbon;

class CurrencyConverter
{
    const DEFAULT_CURRENCY_CODE = 'RUB';
    protected static $container; // here all records where key-symbol
    protected static $containerIds; // here all records where key-id

    public static function loadContainter()
    {
        if (is_null(self::$container)){
            $currencies = Currency::get();
            foreach($currencies as $currency){
                self::$container[$currency->code] = $currency;
                self::$containerIds[$currency->id] = $currency;
            }
        }
    }

    public static function getCurrencies()
    {
        self::loadContainter();

        return self::$container;
    }

    public static function getCurrenciesIds()
    {
        self::loadContainter();

        return self::$containerIds;
    }

    public static function convert($sum, $originCurrencyCode=self::DEFAULT_CURRENCY_CODE, $targetCurrencyCode = null)
    {
        self::loadContainter();

        $originCurrency = self::$container[$originCurrencyCode];

        if (is_null($targetCurrencyCode)){
            $targetCurrencyCode = self::getCurrencyCodeFromSession();
        }
        $targetCurrency = self::$container[$targetCurrencyCode];

        if ($originCurrency->rate == 0 || $originCurrency->updated_at->startOfDay() != Carbon::now()->startOfDay() ||
            $targetCurrency->rate == 0 || $targetCurrency->updated_at->startOfDay() != Carbon::now()->startOfDay() ){
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
    }

    public static function getCurrentCurrencyFromSession()
    {
        self::loadContainter();

        foreach(self::$container as $currency){
            if ($currency->code === self::getCurrencyCodeFromSession()){
                return $currency;
            }
        }
    }

    public static function getCurrencySymbol()
    {
        self::loadContainter();

        $currency = self::$container[self::getCurrencyCodeFromSession()];
        return $currency->symbol;
    }

    public static function getBaseCurrency()
    {
        self::loadContainter();

        foreach (self::$container as $code => $currency){
            if ($currency->isMain())
                return $currency;
        }

        throw new LogicException('Main currency is not defined.');
    }
}
