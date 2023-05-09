<?php

use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Catalog\IndexController;
use App\Http\Controllers\Catalog\ShowOfferDetailController;
use App\Http\Controllers\Catalog\SubscribeController;
use App\Http\Controllers\Catalog\SearchController;
use App\Http\Controllers\Catalog\OneClickFormStoreController;

use App\Http\Controllers\Messages\StoreMessageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CurrencyController;
use App\Http\Controllers\ThemeChangerController;

use App\Http\Controllers\Basket\BasketAddOfferController;
use App\Http\Controllers\Basket\BasketRemoveOfferController;
use App\Http\Controllers\Basket\BasketIndexController;
use App\Http\Controllers\Basket\ShowOrderFormController;
use App\Http\Controllers\Basket\StoreOrderController;

use App\Http\Controllers\User\ShowUserOrdersController;
use App\Http\Controllers\User\ShowOrderController;
use App\Http\Controllers\User\PersonalPageController;
use App\Http\Controllers\User\PersonalDataController;
use App\Http\Controllers\User\PersonalDataUpdateController;

use App\Http\Controllers\Locale\SetLocaleController;


Route::redirect('/', '/catalog/')->name('index');

Route::prefix('catalog')
    ->group(function(){

    Route::get("search/{name}", SearchController::class)
        ->name("search");

    Route::post("oneClickForm", OneClickFormStoreController::class)
        ->name('one-click-form-store');
        
    Route::middleware('catalogInformation')->group(function(){
        Route::get('/', IndexController::class)
            ->name('catalog');

        Route::get('{category_alias}/', IndexController::class)
            ->name('category-offers');

        Route::get('{item_alias}/{offer}', ShowOfferDetailController::class)
            ->name('catalog-offer-details');
    });

    Route::post('subscribe', SubscribeController::class)
        ->name('subscribe');
});

Route::prefix('user')
    ->middleware('auth')
    ->group(function(){
    Route::get('', PersonalPageController::class)
        ->name('personal-page');
    Route::get('data', PersonalDataController::class)
        ->name('personal-data');
    Route::post('data-change',PersonalDataUpdateController::class)
        ->name('personal-data-update');
    Route::get('orders', ShowUserOrdersController::class)
        ->name('personal-orders');

    Route::get('order/{order}', ShowOrderController::class)
        ->name('show-personal-order');
});

Route::prefix('basket')->group(function(){
    Route::get('/add/{offer}', BasketAddOfferController::class)
        ->name("basket-add-offer");
    Route::get('/remove/{offer}', BasketRemoveOfferController::class)
        ->name("basket-remove-offer");

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


Route::get('currency/{currencyCode}', CurrencyController::class )
    ->name('currency-change');
Route::get("set-locale/{target_locale}", SetLocaleController::class)
    ->name("set-locale");

Route::get("change-theme", ThemeChangerController::class)
    ->name("change-theme");



require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
