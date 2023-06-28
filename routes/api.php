<?php

use Illuminate\Support\Facades\Route;

Route::get('lang/{lang}', App\Http\Controllers\Api\LocaleController::class);

Route::prefix('basket')->group(function(){
    Route::get('add/{offer}', App\Http\Controllers\Api\Basket\AddOfferController::class);
    Route::get('remove/{offer}', App\Http\Controllers\Api\Basket\RemoveOfferController::class);
    Route::get('index', App\Http\Controllers\Api\Basket\IndexController::class);
    Route::get('create-order', App\Http\Controllers\Api\Basket\CreateOrderController::class);
    Route::post('store-order',App\Http\Controllers\Api\Basket\OrderStoreController::class);
});


Route::post('subscribe', App\Http\Controllers\Api\Subscribers\SubscribeController::class);
Route::post('message-store', App\Http\Controllers\Api\Contacts\MessageStoreController::class);



Route::prefix('catalog')->group(function(){
    Route::get('/', App\Http\Controllers\Api\Catalog\IndexController::class);
    Route::get('get-categories', App\Http\Controllers\Api\Catalog\GetCategoriesController::class);
    Route::get('category/{category}/options', App\Http\Controllers\Api\Catalog\GetCategoryOptionsController::class);

    Route::post('oneClickBuy', App\Http\Controllers\Api\Catalog\OneClickBuyStoreController::class);
    Route::post('search', App\Http\Controllers\Api\Catalog\SearchController::class);
    Route::get('{offer}', App\Http\Controllers\Api\Catalog\OfferController::class);
});


Route::middleware('auth:sanctum')->group(function(){
    
    Route::prefix('user')->group(function(){
        Route::get('', App\Http\Controllers\Api\User\GetUserController::class);
        Route::post('update', App\Http\Controllers\Api\User\UpdateUserController::class);

        Route::get('active-orders', App\Http\Controllers\Api\User\GetActiveOrdersController::class);
        Route::get('orders', App\Http\Controllers\Api\User\GetOrdersController::class);
        Route::get('orders/{order}', App\Http\Controllers\Api\User\GetOrderController::class);
    });
    
    Route::post('/logout', App\Http\Controllers\Api\Auth\LogoutController::class);
});


Route::post('/signup', App\Http\Controllers\Api\Auth\SighupController::class);
Route::post('/login', App\Http\Controllers\Api\Auth\LoginController::class);