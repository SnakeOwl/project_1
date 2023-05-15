<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/catalog/')->name('index');

Route::prefix('catalog')
    ->group(function(){

    Route::get("search/{name}", App\Http\Controllers\Catalog\SearchController::class);
    Route::post("oneClickForm", App\Http\Controllers\Catalog\OneClickFormStoreController::class);
        
    Route::middleware('catalogInformation')->group(function(){
        Route::get('/', App\Http\Controllers\Catalog\IndexController::class);
        Route::get('{category_alias}/', App\Http\Controllers\Catalog\IndexController::class);
        Route::get('{item_alias}/{offer}', App\Http\Controllers\Catalog\ShowOfferDetailController::class);
    });

    Route::post('subscribe', App\Http\Controllers\Catalog\SubscribeController::class);
});

Route::prefix('user')
    ->middleware('auth')
    ->group(function(){
    Route::get('', App\Http\Controllers\User\PersonalPageController::class);
    Route::get('data', App\Http\Controllers\User\PersonalDataController::class);
    Route::post('data', App\Http\Controllers\User\PersonalDataUpdateController::class);
    Route::get('orders', App\Http\Controllers\User\ShowUserOrdersController::class);
    Route::get('orders/{order}', App\Http\Controllers\User\ShowOrderController::class);
});

Route::prefix('basket')->group(function(){
    Route::get('/add/{offer}', App\Http\Controllers\Basket\BasketAddOfferController::class);
    Route::get('/remove/{offer}', App\Http\Controllers\Basket\BasketRemoveOfferController::class);

    Route::middleware('basket_not_empty')->group(function(){
        Route::get('/', App\Http\Controllers\Basket\BasketIndexController::class);
        Route::get('order-form', App\Http\Controllers\Basket\ShowOrderFormController::class);
        Route::post('order-store', App\Http\Controllers\Basket\StoreOrderController::class);
    });
});

Route::inertia('contact-form', 'MessageForm');
Route::post('contact-form', App\Http\Controllers\Messages\StoreMessageController::class);
Route::get('currency/{currencyCode}', App\Http\Controllers\CurrencyController::class );
Route::get("set-locale/{target_locale}", App\Http\Controllers\Locale\SetLocaleController::class);
Route::get("change-theme", App\Http\Controllers\ThemeChangerController::class);


require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
