<?php
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Admin\Messages\MessageController;
use App\Http\Controllers\Admin\Messages\MessageReadController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ItemController;
use App\Http\Controllers\Admin\StorageController;
use App\Http\Controllers\Admin\SkuPropertyController;
use App\Http\Controllers\Admin\SkuPropertyOptionController;
use App\Http\Controllers\Admin\MerchantController;
use App\Http\Controllers\Admin\SkuController;
use App\Http\Controllers\Admin\SupervisorController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\Order\IndexOrderController;
use App\Http\Controllers\Admin\Order\EditOrderController;
use App\Http\Controllers\Admin\Order\SetOrderStatusController;
use App\Http\Controllers\Admin\Order\OrderDeliveredController;
use App\Http\Controllers\Admin\Order\OrderPaidController;

Route::prefix('admin')->middleware(['is_editor', 'auth'])->group(function (){
    Route::get('/', [SupervisorController::class , 'showSupervisor'])
        ->name('supervisor');

    Route::resource('merchants', MerchantController::class);
    Route::get('merchants/{merchant}/update-token',
    [MerchantController::class, 'updateToken'])
        ->name('update-token');

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

    Route::resource('messages',     MessageController::class)->only('index');
    Route::post('messages/{message}', MessageReadController::class)
        ->name('message-read');

    Route::resource('items',        ItemController::class)->except("update"); // через put и path картинки в js не загружаются (при установки картинки, данные вообще не приходят).
    Route::post('items/{item}/update', [ItemController::class, "update"])->name('item-update');
    Route::resource('items.skus',   SkuController::class);
    Route::resource('item-categories',   CategoryController::class);
    Route::resource('storages',     StorageController::class);
    Route::resource('users',        UserController::class)->except(['create', 'store']);
    Route::resource('sku-properties',   SkuPropertyController::class);
    Route::resource('sku-properties.property-options', SkuPropertyOptionController::class);
});
