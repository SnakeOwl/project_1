<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Catalog\IndexController;
use App\Http\Controllers\Api\GlobalVariablesController;
use App\Http\Controllers\Api\Messages\StoreMessageController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('test', function(){
    return  response("hello", 200)->header('Access-Control-Allow-Origin', 'http://127.0.0.1');
    });

Route::middleware('web')
    ->group(function (){
        Route::post('login', [AuthenticatedSessionController::class, 'store']);
        Route::get('global-variables', GlobalVariablesController::class);

});



Route::get('catalog', IndexController::class);

Route::post('message-store', StoreMessageController::class);
