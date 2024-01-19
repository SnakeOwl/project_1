<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Currency;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $currencies = [
            [
                'code' => 'RUB',
                'symbol' => '₽',
                'is_main' => '1',
                'rate' => '1',
            ],
            [
                'code' => 'USD',
                'symbol' => '$',
            ],
            [
                'code' => 'EUR',
                'symbol' => '€',
            ],
            [
                'code' => 'BYN',
                'symbol' => 'Byn',
            ],
        ];

        foreach($currencies as $currency)
            Currency::factory()
                ->state($currency)
                ->create();
    }
}
