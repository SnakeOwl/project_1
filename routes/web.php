<?php

use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Catalog\CatalogIndexController;
use App\Http\Controllers\Catalog\CatalogDetailController;
use App\Http\Controllers\Messages\StoreMessageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Basket\BasketAddSkuController;
use App\Http\Controllers\Basket\BasketRemoveSkuController;
use App\Http\Controllers\Basket\BasketIndexController;
use App\Http\Controllers\Basket\ShowOrderFormController;
use App\Http\Controllers\Basket\StoreOrderController;
use App\Http\Controllers\User\ShowUserOrdersController;
use App\Http\Controllers\Locale\SetLocaleController;


use App\Http\Controllers\TestController;
Route::get('/test', TestController::class)->name('test');


Route::get("set-locale/{target_locale}", SetLocaleController::class)
    ->name("set-locale");

Route::redirect('/', '/catalog/')->name('index');
Route::prefix('catalog')->group(function(){
    Route::get('/', CatalogIndexController::class)->name('catalog');
    Route::get('/category/{category_alias}/{item_alias}/{sku}', CatalogDetailController::class)
        ->name('catalog-sku-details');
});

Route::prefix('user')->group(function(){
    Route::get('orders', ShowUserOrdersController::class)
        ->name('user-orders');
});

Route::prefix('basket')->group(function(){
    Route::get('/add/{sku}', BasketAddSkuController::class)
        ->name("add-sku-to-basket");
    Route::get('/remove/{sku}', BasketRemoveSkuController::class)
        ->name("remove-sku-from-basket");

    Route::middleware('basket_not_empty')->group(function(){
        Route::get('/', BasketIndexController::class)
            ->name("basket");
        Route::get('/order-form', ShowOrderFormController::class)
            ->name("order-form");
        Route::post('order-store', StoreOrderController::class)
            ->name('order-store');
    });
});

Route::inertia('contact-form', 'MessageForm')
    ->name('message-form');
Route::post('contact-form', StoreMessageController::class)
    ->name('message-store');




require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
