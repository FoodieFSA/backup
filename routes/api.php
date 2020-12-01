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
use App\Http\Controllers\UserController;

Route::group(['prefix' => 'test'], function () {
    Route::get('',[testController::class, 'test']);
    Route::get('test',[testController::class, 'test']);
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('registerUser',[AuthController::class, 'registerUser']);
    Route::post('loginUser',[AuthController::class, 'loginUser']);
    Route::post('logout',[AuthController::class, 'logoutUser']);

    Route::post('refresh_token',[AuthController::class, 'refreshToken']);

    Route::delete('deleteUser',[AuthController::class, 'deleteUser']);
});

Route::group(['prefix' => 'user'], function () {
    Route::get('getMe', [UserController::class, 'getMyself']);
    Route::put('updateUser', [UserController::class, 'updateUser']);
    Route::get('getUser', [UserController::class, 'getUser']);
    Route::post('uploadAvatar', [UserController::class, 'uploadUserAvatar']);
});

Route::group(['prefix' => 'workoutLog'], function () {
    Route::get('',[WorkoutLogController::class, 'storeLog']);
    Route::post('createWorkoutLog',[WorkoutLogController::class, 'createWorkoutLog']);
    Route::get('getWorkoutLog',[WorkoutLogController::class, 'getWorkoutLog']);
    Route::get('getSingleWorkoutLog',[WorkoutLogController::class, 'getSingleWorkoutLog']);
    Route::put('updateWorkoutLog',[WorkoutLogController::class, 'updateWorkoutLog']);
});

Route::group(['prefix' => 'exercise'], function () {
    Route::get('',[ExerciseController::class, 'exercise']);
    Route::get('test',[ExerciseController::class, 'chest']);
});
