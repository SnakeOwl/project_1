<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::prefix('basket')->group(function(){
    Route::get('add/{offer}', App\Http\Controllers\Api\Basket\AddOfferController::class);
    Route::get('remove/{offer}', App\Http\Controllers\Api\Basket\RemoveOfferController::class);
    Route::get('index', App\Http\Controllers\Api\Basket\IndexController::class);
    Route::get('create-order', App\Http\Controllers\Api\Basket\CreateOrderController::class);
    Route::post('store-order',App\Http\Controllers\Api\Basket\OrderStoreController::class);
});

Route::post('subscribe', App\Http\Controllers\Api\Subscribers\SubscribeController::class);
Route::post('message-store', App\Http\Controllers\Api\Contacts\MessageStoreController::class);

Route::get('lang/{lang}', App\Http\Controllers\Api\LocaleController::class);
Route::post('catalog/oneClickBuyStore', App\Http\Controllers\Api\Catalog\OneClickBuyStoreController::class);
Route::get('catalog', App\Http\Controllers\Api\Catalog\IndexController::class);
Route::get('catalog/{offer}', App\Http\Controllers\Api\Catalog\OfferController::class);
Route::post('catalog/search', App\Http\Controllers\Api\Catalog\SearchController::class);
Route::post('global-variables', App\Http\Controllers\Api\GlobalVariablesController::class);


Route::middleware('auth:sanctum')->group(function(){
    
    Route::prefix('user')->group(function(){
        Route::get('', App\Http\Controllers\Api\User\GetUserController::class);
        Route::get('orders', App\Http\Controllers\Api\User\GetOrdersController::class);
        Route::get('orders/{order}', App\Http\Controllers\Api\User\GetOrderController::class);
        Route::post('update', App\Http\Controllers\Api\User\UpdateUserController::class);
    });
    
    Route::post('/logout', App\Http\Controllers\Api\Auth\LogoutController::class);
});

Route::post('/signup', App\Http\Controllers\Api\Auth\SighupController::class);
Route::post('/login', App\Http\Controllers\Api\Auth\LoginController::class);