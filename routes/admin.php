<?php
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\SupervisorController;
use App\Http\Controllers\Admin\Categories\CategoryController;
use App\Http\Controllers\Admin\Categories\Shapes\ShapeController;
use App\Http\Controllers\Admin\Categories\Shapes\Options\ShapeOptionController;
use App\Http\Controllers\Admin\Items\ItemController;
use App\Http\Controllers\Admin\Merchants\MerchantController;
use App\Http\Controllers\Admin\Messages\MessageController;
use App\Http\Controllers\Admin\Offers\OfferController;
use App\Http\Controllers\Admin\Orders\IndexOrderController;
use App\Http\Controllers\Admin\Orders\EditOrderController;
use App\Http\Controllers\Admin\Orders\SetOrderStatusController;
use App\Http\Controllers\Admin\Orders\OrderDeliveredController;
use App\Http\Controllers\Admin\Orders\OrderPaidController;
use App\Http\Controllers\Admin\OneClickForm\OneClickFormController;
use App\Http\Controllers\Admin\Subscribers\SubscribersController;
use App\Http\Controllers\Admin\Storages\StorageController;
use App\Http\Controllers\Admin\Users\UserController;

Route::prefix('admin')
    ->middleware(['is_editor', 'auth'])
    ->middleware('adminCounter')
    ->group(function (){

    Route::get('/', SupervisorController::class)
        ->name('supervisor');

    Route::prefix('orders')->group(function ()
    {
        Route::get('/', IndexOrderController::class)
            ->name('all-orders');
        Route::get('/edit/{order}', EditOrderController::class)
            ->name('edit-order');
        Route::get('/{order}/set-status/{status}', SetOrderStatusController::class)
            ->name('set-order-status');
        Route::get('/{order}/delivered', OrderDeliveredController::class)
            ->name('order-delivered');
        Route::get('/{order}/paid', OrderPaidController::class)
            ->name('order-paid');
    });

    Route::resource('oneClickForm', OneClickFormController::class)
        ->only(['index', 'destroy']);

    Route::resource('messages', MessageController::class)
        ->only(['index', 'destroy']);

    Route::resource('items', ItemController::class);
    Route::resource('items.offers', OfferController::class)
        ->except("update");
        // через put и path картинки в js не загружаются (при установки картинки, данные вообще не приходят).
    Route::post('items/{item}/offers/{offer}/update', [OfferController::class, "update"])
        ->name('offer-update');

    Route::resource('storages', StorageController::class);

    Route::resource('users', UserController::class)
        ->except(['create', 'store']);

    Route::resource('subscribers', SubscribersController::class)
        ->only(['index' ,'destroy']);

    Route::resource('categories', CategoryController::class);
    Route::resource('shapes', ShapeController::class)
        ->only(['store', 'update', 'destroy']);
    Route::resource('shape-options', ShapeOptionController::class)
        ->only(['store', 'update', 'destroy']);

    Route::resource('merchants', MerchantController::class);
    Route::get('merchants/{merchant}/update-token', [MerchantController::class, 'updateToken'])
        ->name('update-token');
});
