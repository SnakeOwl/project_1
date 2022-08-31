<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CatalogController;

Route::resource('/catalog', CatalogController::class)->only(['show', 'index']);
