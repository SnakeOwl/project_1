<?php

namespace App\Models\Traits;
use Illuminate\Support\Facades\App;

trait Translatable
{
    protected $defaultLocale = "ru";

    public function __($originFieldName, $defaultValue)
    {
        $locale = App::getLocale() ?? $this->defaultLocale ;
        if ($locale === "en")
            $fieldName = $originFieldName . '_en';

        if (!array_key_exists($originFieldName, $this->attributes))
            throw new \LogicException('No such attribute for model.' . get_class($this));

        if ($locale  === 'en')
            return $this->$fieldName;

        // с верии laravel 9, я не могу получить один из артрибутов объекта.
        // могу получить другие свойства, но то, к которому идёт обращение не могу.
        return $defaultValue;
    }
}
