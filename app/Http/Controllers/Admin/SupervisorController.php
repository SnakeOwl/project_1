<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class SupervisorController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Admin/Supervisor');
    }
}
