<?php
use Illuminate\Support\Facades\Route;


Route::prefix('admin')
    ->middleware(['auth', 'isEditor', 'adminCounter'])
    ->group(function (){

    Route::get('/', App\Http\Controllers\Admin\SupervisorController::class);

    Route::resource('oneClickForm', App\Http\Controllers\Admin\OneClickForm\OneClickFormController::class)
        ->only(['index', 'destroy']);

    Route::resource('messages', App\Http\Controllers\Admin\Messages\MessageController::class)
        ->only(['index', 'destroy']);

    Route::resource('users', App\Http\Controllers\Admin\Users\UserController::class)
        ->except(['create', 'store']);

    Route::resource('subscribers', App\Http\Controllers\Admin\Subscribers\SubscribersController::class)
        ->only(['index' ,'destroy']);
});
