<?php

namespace App\Models\Traits;
use Illuminate\Support\Facades\App;

// old style
trait Translatable
{
    protected $defaultLocale = "ru";

    public function __($originFieldName)
    {
        $locale = App::getLocale() ?? $this->defaultLocale ;
        if ($locale === "en")
            $fieldName = $originFieldName . '_en';
        else
            $fieldName = $originFieldName;


        if (!array_key_exists($originFieldName, $this->attributes))
            throw new \LogicException('No such attribute for model.' . get_class($this));


        if ($locale  === 'en' && (is_null($this->$fieldName) || empty($this->$fieldName)) )
            return $this->$originFieldName;

        return $this->$fieldName;
    }
}
