<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ThemeChangerController extends Controller
{
    public function __invoke()
    {
        if (session("themeColor") == "dark")
            session(["themeColor" => "light"]);
        else
            session(["themeColor" => "dark"]);
    }

}
