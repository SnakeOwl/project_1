<?php

namespace App\Http\Controllers\Locale;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SetLocaleController extends Controller
{
    public function __invoke($target_locale)
    {
        $available_locales = ['ru', 'en'];

        if (in_array($target_locale, $available_locales))
            session()->put('locale', $target_locale);

        return redirect()->back();
    }
}
