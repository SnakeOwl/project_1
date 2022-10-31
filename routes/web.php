<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CreateMessageController;
use App\Http\Controllers\UserController;

Route::redirect('/', '/catalog')->name('index');
Route::inertia('contact-form', 'MessageForm')
    ->name('message-form');
Route::post('contact-form', CreateMessageController::class)
    ->name('create-message');

require __DIR__.'/auth.php';
require __DIR__.'/catalog_and_basket.php';
require __DIR__.'/admin.php';
