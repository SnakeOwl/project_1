<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ThemeChangerController extends Controller
{
    public function __invoke()
    {
        if (session("themeColor") == "light")
            session(["themeColor" => "dark"]);
        else
            session(["themeColor" => "light"]);
    }
}
