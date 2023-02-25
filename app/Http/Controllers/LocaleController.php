<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class LocaleController extends Controller
{
    public function change($locale)
    {
        $availableLocales = ['ru', 'en'];
        if (!in_array($locale, $availableLocales))
            $locale = config('app.locale');

        session(['locale' => $locale]);
        App::setLocale($locale);
        $current = App::getLocale();

        return redirect()->back();
    }
}
