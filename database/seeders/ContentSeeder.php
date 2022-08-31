<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ContentSeeder extends Seeder
{
    private $now;

    public function __construct()
    {
        $this->now = \Carbon\Carbon::now();
    }

    public function run()
    {
        $categories = [
            [
                'name' => 'Клавиатуры',
                'name_en' => 'Keyboards',
                'alias' => 'keyboads',
            ],
            [
                'name' => 'Мыши',
                'name_en' => 'Mice',
                'alias' => 'mice',
            ],
            [
                'name' => 'Игровые приставки',
                'name_en' => 'Play stations',
                'alias' => 'playstation',
            ],
            [
                'name' => 'Мониторы',
                'name_en' => 'Displays',
                'alias' => 'displays',
            ],
            [
                'name' => 'Камеры',
                'name_en' => 'Camers',
                'alias' => 'camers',
            ],
            [
                'name' => 'Звук',
                'name_en' => 'sound',
                'alias' => 'sound',
            ],
            [
                'name' => 'Наушники',
                'name_en' => 'Headphones',
                'alias' => 'headphones',
            ],
            [
                'name' => 'Колонки',
                'name_en' => 'Columns',
                'alias' => 'columns',
            ],
        ];

        foreach($categories as $category)
        {
            $now = \Carbon\Carbon::now();
            $categoryId = DB::table('categories')->insert($category);
        }

        $properties = [
            [
                'name' => 'Цвет',
                'name_en' => 'Color',
                'options' => [
                    [
                        'name' => 'Белый',
                        'name_en' => 'White',
                    ],
                    [
                        'name' => 'Черный',
                        'name_en' => 'Black',
                    ],
                    [
                        'name' => 'Зеленый',
                        'name_en' => 'Green',
                    ],
                    [
                        'name' => 'Красный',
                        'name_en' => 'Red',
                    ],
                    [
                        'name' => 'Синий',
                        'name_en' => 'Blue',
                    ],
                    [
                        'name' => 'Желтый',
                        'name_en' => 'Yellow',
                    ],
                    [
                        'name' => 'Золотой',
                        'name_en' => 'Gold',
                    ],
                    [
                        'name' => 'Оранжевый',
                        'name_en' => 'Orange',
                    ],
                    [
                        'name' => 'Фиолетовый',
                        'name_en' => 'Purple',
                    ],
                    [
                        'name' => 'Розовый',
                        'name_en' => 'Pink',
                    ],
                    [
                        'name' => 'Серый',
                        'name_en' => 'Gray',
                    ],
                ],
            ],
            [
                'name' => 'Материал',
                'name_en' => 'Material',
                'options' => [
                    [
                        'name' => 'Пластик',
                        'name_en' => 'Plastic',
                    ],
                    [
                        'name' => 'Металл',
                        'name_en' => 'Metal',
                    ],
                    [
                        'name' => 'Дерево',
                        'name_en' => 'Wood',
                    ],
                ],
            ],
        ];

        foreach($properties as $property)
        {
            $property['created_at'] = $this->now;
            $property['updated_at'] = $this->now;
            $options = $property['options'] ?? array();
            unset($property['options']);
            $propertyId = DB::table('properties')->insertGetId($property);

            foreach ($options as $option) {
                $option['created_at'] = $this->now;
                $option['updated_at'] = $this->now;
                $option['property_id'] = $propertyId;
                DB::table('property_options')->insert($option);
            }
        }

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
                'is_main' => '0',
            ],
            [
                'code' => 'EUR',
                'symbol' => '€',
                'is_main' => '0',
            ],
        ];
        foreach($currencies as $currency)
        {
            $currency['created_at'] = $this->now;
            $currency['updated_at'] = $this->now;
            DB::table('currencies')->insert($currency);
        }
    }
}
