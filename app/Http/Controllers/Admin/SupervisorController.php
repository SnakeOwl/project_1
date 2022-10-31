<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupervisorController extends Controller
{
    public function showSupervisor()
    {
        return Inertia::render('Admin/Supervisor');
    }
}
