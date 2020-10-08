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
// import the controller class
use App\Http\Controllers\testController;
use App\Http\Controllers\AuthController;

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
//
//Route::get('/user', function (Request $request) {
//    return response()->json(["test"=>"hellsdsdsdsdso"]);
//});

Route::group(['prefix' => 'test'], function () {
    Route::get('',[testController::class, 'test']);
});
Route::group(['prefix' => 'auth'], function () {
    Route::post('registerUser',[AuthController::class, 'registerUser']);
});
