<?php
namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ShowUserOrdersController extends Controller
{
    public function __invoke()
    {
        $orders = Auth::user()->orders()->with('currency')->paginate(25);

        return Inertia::render('Auth/Order/Index', compact('orders'));
    }
}
