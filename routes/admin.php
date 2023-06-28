<?php
use Illuminate\Support\Facades\Route;


Route::prefix('admin')
    ->middleware(['auth', 'isEditor', 'adminCounter'])
    ->group(function (){

    Route::get('/', App\Http\Controllers\Admin\SupervisorController::class);

    Route::prefix('orders')->group(function ()
    {
        Route::get('/', App\Http\Controllers\Admin\Orders\IndexOrderController::class);
        Route::get('/edit/{order}', App\Http\Controllers\Admin\Orders\EditOrderController::class);
        Route::get('/{order}/set-status/{status}', App\Http\Controllers\Admin\Orders\SetOrderStatusController::class);
        Route::get('/{order}/delivered', App\Http\Controllers\Admin\Orders\OrderDeliveredController::class);
        Route::get('/{order}/paid', App\Http\Controllers\Admin\Orders\OrderPaidController::class);
    });

    Route::resource('oneClickForm', App\Http\Controllers\Admin\OneClickForm\OneClickFormController::class)
        ->only(['index', 'destroy']);

    Route::resource('messages', App\Http\Controllers\Admin\Messages\MessageController::class)
        ->only(['index', 'destroy']);

    Route::resource('items', App\Http\Controllers\Admin\Items\ItemController::class);
    Route::resource('items.offers', App\Http\Controllers\Admin\Offers\OfferController::class)
        ->except("update");
        // через put и path картинки в js не загружаются (при установки картинки, данные вообще не приходят).
    Route::post('items/{item}/offers/{offer}/update', [App\Http\Controllers\Admin\Offers\OfferController::class, "update"]);

    Route::resource('storages', App\Http\Controllers\Admin\Storages\StorageController::class);

    Route::resource('users', App\Http\Controllers\Admin\Users\UserController::class)
        ->except(['create', 'store']);

    Route::resource('subscribers', App\Http\Controllers\Admin\Subscribers\SubscribersController::class)
        ->only(['index' ,'destroy']);

    Route::resource('categories', App\Http\Controllers\Admin\Categories\CategoryController::class);

    Route::resource('shapes', App\Http\Controllers\Admin\Categories\Shapes\ShapeController::class)
        ->only(['store', 'update', 'destroy']);
    Route::resource('shape-options', App\Http\Controllers\Admin\Categories\Shapes\Options\ShapeOptionController::class)
        ->only(['store', 'update', 'destroy']);
});
