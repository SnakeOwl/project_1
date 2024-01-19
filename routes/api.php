<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;

Route::get("/", function (){ return response("Api is working", 200); });


Route::get("/tt", function (){
    Log::info("tt");
});


Route::prefix("get")->group(function(){
    Route::get("item/{item}", [App\Http\Controllers\Api\Resources\ItemsController::class, "show"]);
    Route::get("options-by-item/{item}", App\Http\Controllers\Api\getters\GetOptionsByItemIDController::class);
    
    Route::get("storages", [App\Http\Controllers\Api\Admin\StoragesController::class, "index"]);
    Route::get("storage/{storage}", [App\Http\Controllers\Api\Admin\StoragesController::class, "show"]);

    Route::get("categories", [App\Http\Controllers\Api\Resources\CategoriesController::class, "index"]);
    Route::get("category/{category}", [App\Http\Controllers\Api\Resources\CategoriesController::class, "show"]);

    Route::get("categories", [App\Http\Controllers\Api\Resources\CategoriesController::class, "index"]);
    Route::get("category/{category}", [App\Http\Controllers\Api\Resources\CategoriesController::class, "show"]);

    Route::get("categories/{category}/shapes", [App\Http\Controllers\Api\Admin\ShapesController::class, "index"]);
    Route::get("categories/{category}/shapes/{shape}", [App\Http\Controllers\Api\Admin\ShapesController::class, "show"]);

    Route::get("shape-option/{options}", [App\Http\Controllers\Api\Admin\ShapeOptionsController::class, "show"]);

    Route::get("messages", [App\Http\Controllers\Api\Admin\MessagesController::class, "index"]);


    Route::resource("items.offers", App\Http\Controllers\Api\Partner\OffersController::class)->only(["index", "edit"]);
});


Route::prefix('basket')->group(function(){
    Route::get('add/{offer}', App\Http\Controllers\Api\Basket\AddOfferController::class);
    Route::get('remove/{offer}', App\Http\Controllers\Api\Basket\RemoveOfferController::class);
    Route::get('index', App\Http\Controllers\Api\Basket\IndexController::class);
    Route::get('create-order', App\Http\Controllers\Api\Basket\CreateOrderController::class);
    Route::post('store-order',App\Http\Controllers\Api\Basket\OrderStoreController::class);
});


Route::post('subscribe', App\Http\Controllers\Api\Subscribers\SubscribeController::class);
Route::post("one-click-request", [App\Http\Controllers\Api\Resources\OneClickRequestController::class, "store"]);
Route::post('message-store', App\Http\Controllers\Api\Contacts\MessageStoreController::class);


Route::prefix('catalog')->group(function(){
    Route::get('', App\Http\Controllers\Api\Catalog\IndexController::class);
    Route::get('category/{category_alias}/options', App\Http\Controllers\Api\Catalog\GetCategoryOptionsController::class);

    Route::post('oneClickBuy', App\Http\Controllers\Api\Catalog\OneClickBuyStoreController::class);
    Route::post('search', App\Http\Controllers\Api\Catalog\SearchController::class);
    Route::get('{offer}', App\Http\Controllers\Api\Catalog\OfferController::class);
});


Route::middleware('auth:sanctum')->group(function(){

    Route::post('/logout', App\Http\Controllers\Api\Auth\LogoutController::class);
    
    Route::prefix('user')->group(function(){
        Route::get('', App\Http\Controllers\Api\User\GetUserController::class);
        Route::post('update', App\Http\Controllers\Api\User\UpdateUserController::class);

        Route::get('active-orders', App\Http\Controllers\Api\User\GetActiveOrdersController::class);
        Route::get('orders', App\Http\Controllers\Api\User\GetOrdersController::class);
        Route::get('orders/{order}', App\Http\Controllers\Api\User\GetOrderController::class);

        Route::prefix("partner")->group(function(){
            Route::apiResource("items", App\Http\Controllers\Api\Resources\ItemsController::class);

            // при использовании методов PUT/PATCH картинки не передаются.
            Route::resource("items.offers", App\Http\Controllers\Api\Partner\OffersController::class)->only(["destroy", "store"]);
            Route::post("items/{item}/offers/{offer}", [App\Http\Controllers\Api\Partner\OffersController::class, "update"]);
        });
    });


    Route::prefix("admin")
        ->middleware("UIsAdmin")
        ->group(function (){
            Route::apiResources([
                "users" => App\Http\Controllers\Api\Admin\UsersController::class,
                "storages" => App\Http\Controllers\Api\Admin\StoragesController::class,
                "orders" => App\Http\Controllers\Api\Admin\OrdersController::class,
                "categories" => App\Http\Controllers\Api\Resources\CategoriesController::class,
                "categories.shapes" => App\Http\Controllers\Api\Admin\ShapesController::class,
                "shapes.options" => App\Http\Controllers\Api\Admin\ShapeOptionsController::class,
                "messages" => App\Http\Controllers\Api\Admin\MessagesController::class,
                "subscriptions" => App\Http\Controllers\Api\Admin\SubscriptionsController::class,
                "one-click-requests" => App\Http\Controllers\Api\Resources\OneClickRequestController::class,
            ]);
        });
});


Route::post('/signup', App\Http\Controllers\Api\Auth\SighupController::class);
Route::post('/login', App\Http\Controllers\Api\Auth\LoginController::class);