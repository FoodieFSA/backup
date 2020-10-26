<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\WorkoutLog;

class WorkoutLogController extends Controller
{
    //
    public function storeLog (Request $request) {
        return response()->json(["stored"=>"yes"]);
    }

    public function createWorkoutLog (Request $request) {

        /*
        TODO:

        find user to attach workoutlog
        expertise level
        soft-deleted date

        */
        $userId = $request->userId;
        $findUser = User::where("userId", $userId)->first();
        if(!$findUser) {
            return response()->json(["error"=>"User does not exist"],401);
        }
        $createdWorkoutLog = new WorkoutLog;
        $createdWorkoutLog->expertise_level = $request->expertiseLevel;
        $createdWorkoutLog->deleted_date = $request->deletedDate;
        $createdWorkoutLog->save();
    }
}
