<?php

namespace App\Classes\Filters;

use App\Classes\Filters\IFilter;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

abstract class Filter implements IFilter
{
    private $queryParams = [];

    public function __construct(array $queryParams)
    {
        $this->queryParams = $queryParams;
    }

    abstract protected function getCallbacks(): array;

    public function apply(Builder $builder)
    {
        $this->before($builder);

        foreach ($this->getCallbacks() as $name => $callback){
            if (isset($this->queryParams[$name]))
                call_user_func($callback, $builder, $this->queryParams[$name]);
        }
    }

    protected function before(Builder $builder)
    {}

    protected function getQueryParam(string $key, $default = null)
    {
        return $this->queryParams[$key] ?? $default;
    }

    protected function removeQueryParam(string ...$keys)
    {
        foreach($keys as $key)
            unset($this->queryParams[$key]);

        return $this;
    }
}
