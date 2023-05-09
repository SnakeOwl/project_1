<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Http\Middleware\HandleInertiaRequests as Middleware;

class ThemeColor extends Middleware
{
    // Inertia's method sharing data
    public function share(Request $request)
    {
        $theme = session("themeColor", "light");
        session(["themeColor" => $theme]);

        return array_merge(parent::share($request), [
            "themeColor" => $theme
        ]);
    }
}
