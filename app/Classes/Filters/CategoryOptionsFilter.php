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

    function __construct($activeCategoryAlias, Category $category = null)
    {
        if ($category === null) {
            $this->activeCategory = Category::byAlias($activeCategoryAlias);
        } else {
            $this->activeCategory = $category;
        }

        $this->categoryOffers = Offer::byCategory($this->activeCategory->id)->get();
        $this->availableOffers = $this->categoryOffers;
    }

    public function filterByOption($shapeOptionsIds)
    {
        if (count($this->availableOffers) === 0)
            return false;

        if (count($shapeOptionsIds) > 0) {
            $filter = new OfferFilter(array_filter(['options' => $shapeOptionsIds]));
            $this->availableOffers = $this->availableOffers->toQuery()->filter($filter)->get();
        }
    }

    public function filterByPrice($priceFrom = 0, $priceTo = 0)
    {
        if (count($this->availableOffers) === 0)
            return false;

        $filter = new OfferFilter(array_filter([
            'priceFrom' => $priceFrom,
            'priceTo' => $priceTo
        ]));
        $this->availableOffers = $this->availableOffers->toQuery()->filter($filter)->get();
    }

    
    // return : [optionId => countOfOffers, ...]
    public function getAvailableOfferShapeOptionsId()
    {
        $result = [];

        foreach ($this->availableOffers as $offer) {

            foreach ($offer->options as $option)

                if (array_key_exists($option->id, $result)) {
                    $result[$option->id]++;
                } else {
                    $result[$option->id] = 1;
                }
        }
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