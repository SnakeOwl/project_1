<?php

namespace Database\Seeders;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Offer;
use App\Models\Item;
use App\Models\Category;
use App\Models\Shape;
use App\Models\ShapeOption;
use App\Models\Parameter;

class ContentSeeder extends Seeder
{
    public function run()
    {
        $count_categories = 3;
        $count_shapes_per_category = 4;             // шейпы будут рандомно привязаны к категориям
        $count_shape_options_per_shape = 2;    // опции будут рандомно привязаны к шейпам
        $count_items = 16;             // предметы будут рандомно привязаны к категориям
        $COUNT_OFFERS_PER_ITEM = 4;    // перемножит количество предметов и шейпов, потом создаст заданное число записей
        $count_parameters_per_item = 4; // уникальные параметры для каждого предмета
        /*
            Если создавать эти модели внутри других фабрик (->recycle(Shape::factory ...)),
            они начинают создавать не нужные модели и не корректно работает ->count(number).
            Из-за этого все модели создаю отдельно, и просто связываю их.
            Так же при создании таким образом моделей (фабрика внутри фабрики),
            Не работает ->sequence.
        */
        $categories = Category::factory()
            ->count($count_categories)
            ->create();

        $shapes = [];
        foreach ($categories as $category)
            $shapes[] = Shape::factory()
                ->count($count_shapes_per_category)
                ->for($category)
                ->create();

        foreach ($shapes as $claster)
            foreach($claster as $shape)
                ShapeOption::factory()
                    ->count($count_shape_options_per_shape)
                    ->for($shape)
                    ->create();

        $items = Item::factory()
            ->count($count_items)
            ->recycle($categories)
            ->create();

        foreach ($items as $item)
        {
            $item->load("category.shapes.options");

            $shapeOptions = ShapeOption::whereHas('shape', function(Builder $query) use($item){
                $query->where('category_id', $item->category->id);
            })->get();

            for($i=0; $i < $COUNT_OFFERS_PER_ITEM; $i++)
            {
                $params = ['price' => ($i+1)*1000*2];

                Offer::factory()
                    ->sequence($params)
                    ->for($item)
                    ->hasAttached($shapeOptions->random(4))
                    ->create();
            }

            Parameter::factory()
                ->count($count_parameters_per_item)
                ->for($item)
                ->create();
        }
    }
}
