<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Builder;
use App\Domain\Filters\IFilter;


trait Filterable
{
    public function scopeFilter(Builder $builder, IFilter $filter)
    {
        $filter->apply($builder);

        return $builder;
    }
}
