<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\Admin\AdminController;

Route::resource('/catalog', CatalogController::class)->only(['show', 'index']);

Route::prefix('admin')->middleware(['auth', 'is_editor'])->group(function(){
    Route::get('/', [AdminController::class , 'index'])->name('admin-index');
});
