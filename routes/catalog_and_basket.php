<?php
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Catalog\CatalogIndexController;
use App\Http\Controllers\Catalog\CatalogDetailController;

Route::prefix('catalog')->group(function(){
    Route::get('/', CatalogIndexController::class)->name('catalog');
    Route::get('/{category_alias}/{item_alias}/{sku}', CatalogDetailController::class)
        ->name('catalog-sku-details');

});
