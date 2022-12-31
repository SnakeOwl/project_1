<?php

namespace App\Domain\Filters;

use Illuminate\Database\Eloquent\Builder;

interface IFilter
{
    public function apply(Builder $builder);
}
