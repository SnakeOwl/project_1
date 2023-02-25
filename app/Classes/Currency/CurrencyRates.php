<?php

namespace App\Classes\Currency;

use App\Models\Currency;
use GuzzleHttp\Client;

class CurrencyRates
{
    /*
        Обновляет курсы валют.
        Берет их с внешнего источника и обновляет записи в БД.
    */
    public static function getRates(): void
    {
        $BaseCurrencyCode = (CurrencyConverter::getBaseCurrency())->code;
        $url = config('currency_rates.api_url') . "base=$BaseCurrencyCode";
        $client = new Client();

        $responce = $client->request('GET', $url);
        if ($responce->getStatusCode() !== 200)
            throw new \Exception('There is a problem with currency rate service.');


        $rates = json_decode($responce->getBody()->getContents(), true)['rates'];
        foreach(CurrencyConverter::getCurrencies() as $currency)
        {
            if (!$currency->isMain())
            {
                if (!isset($rates[$currency->code]))
                {
                    throw new Exception('There is a problem with currency rate service. Currency not found: ' . $currency->code);
                }else
                {
                    $currency->update(['rate' => $rates[$currency->code]]);
                    $currency->touch();
                }
            }else
            {
                $currency->update(['rate' => 1]);
                $currency->touch();
            }
        }
    }
}
