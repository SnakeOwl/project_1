<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Builder;
use App\Classes\Filters\IFilter;


trait Filterable
{
    public function scopeFilter(Builder $builder, IFilter $filter)
    {
        $filter->apply($builder);

        return $builder;
    }
}
