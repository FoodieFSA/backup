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
use App\Http\Controllers\WorkoutLogController;
use App\Http\Controllers\ExerciseController;


Route::group(['prefix' => 'test'], function () {
    Route::get('',[testController::class, 'test']);
    Route::get('test',[testController::class, 'test']);
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('registerUser',[AuthController::class, 'registerUser']);
    Route::post('loginUser',[AuthController::class, 'loginUser']);
});

Route::group(['prefix' => 'workoutLog'], function () {
    Route::get('',[WorkoutLogController::class, 'storeLog']);
    Route::post('createWorkoutLog',[WorkoutLogController::class, 'createWorkoutLog']);
});

Route::group(['prefix' => 'exercise'], function () {
    Route::get('',[ExerciseController::class, 'exercise']);
    Route::get('test',[ExerciseController::class, 'chest']);
});
