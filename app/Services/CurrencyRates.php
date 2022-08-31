<?php

namespace App\Services;

use App\Models\Currency;
use GuzzleHttp\Client;

class CurrencyRates
{
    public static function getRates()
    {
        $BaseCurrencyCode = (CurrencyConverter::getBaseCurrency())->code;
        $url = config('currency_rates.api_url') . "base=$BaseCurrencyCode";

        $client = new Client();

        $responce = $client->request('GET', $url);
        if ($responce->getStatusCode() !== 200){
            throw new \Exception('There is a problem with currency rate service.');
        }

        $rates = json_decode($responce->getBody()->getContents(), true)['rates'];
        foreach(CurrencyConverter::getCurrencies() as $currency){
            if (!$currency->isMain()){
                if (!isset($rates[$currency->code])){
                    throw new Exception('There is a problem with currency rate service. Currency not found: ' . $currency->code);
                }else{
                    $currency->update(['rate' => $rates[$currency->code]]);
                    $currency->touch();
                }
            }else{
                // нужно чтобы в БД поле updated_at не было null
                $currency->update(['rate' => 1]);
                $currency->touch();
            }
        }
    }
}
