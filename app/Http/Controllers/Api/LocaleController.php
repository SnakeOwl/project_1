<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LocaleController extends Controller
{
    public function __invoke($lang="ru")
    {
        if ($lang == "ru")
            return translations( resource_path('lang/ru.json'));
        
        if ($lang == "en")
            return translations( resource_path('lang/en.json'));
    }
}
