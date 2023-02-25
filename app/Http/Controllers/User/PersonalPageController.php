<?php

namespace App\Http\Controllers\User;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PersonalPageController extends Controller
{
    public function __invoke()
    {
        $user = Auth::user();
        $activeOrders = $user->orders()->active()->with('currency')->paginate(10);

        return Inertia::render('Auth/User/PersonalPage',
            compact("user", "activeOrders"));
    }
}
