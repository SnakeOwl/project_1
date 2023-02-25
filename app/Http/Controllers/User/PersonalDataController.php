<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PersonalDataController extends Controller
{
    public function __invoke()
    {
        $user = Auth::user();

        return Inertia::render('Auth/User/PersonalData', compact('user'));
    }
}
