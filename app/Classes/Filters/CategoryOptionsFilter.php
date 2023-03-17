<?php

namespace App\Classes\Filters;

use App\Models\Offer;
use App\Models\Category;

// в классе реализованы функции для работы с фильтром по опциям категорий.
class CategoryOptionsFilter
{
    // контейнеры, в которых буду хранить данные по категории.
    protected $activeCategory;
    protected $categoryOffers; // тут хранятся все оферы с категории
    protected $availableOffers; // а тут отфильтрованные по опциям оферы

    function __construct($activeCategoryAlias)
    {
        $this->activeCategory = Category::byAlias($activeCategoryAlias);
        $this->categoryOffers = Offer::byCategory($this->activeCategory->id)->get();
        $this->availableOffers = $this->categoryOffers;
    }

    public function filterByOption($shapeOptionsIds)
    {
        if (count($shapeOptionsIds) > 0)
        {
            $filter = new OfferFilter( array_filter(['options'=> $shapeOptionsIds]) );
            $this->availableOffers = $this->categoryOffers->toQuery()->filter($filter)->get();
        }
    }

    // return array[optionId => countOffers]
    public function getAvailableOfferShapeOptionsId()
    {
        $result = [];

        foreach($this->availableOffers as $offer)
            foreach($offer->options as $option)
                if(array_key_exists($option->id, $result))
                    $result[$option->id]++;
                else
                    $result[$option->id] = 1;

        return $result;
    }

    public function getAvailableOffers()
    {
        return $this->availableOffers;
    }

    public function getActiveCategory()
    {
        return $this->activeCategory;
    }
}
