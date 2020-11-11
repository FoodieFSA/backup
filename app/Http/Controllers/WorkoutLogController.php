<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\WorkoutLog;
use Illuminate\Database\Eloquent\SoftDeletes;

class WorkoutLogController extends Controller
{
    //
    public function storeLog (Request $request) {
        return response()->json(["stored"=>"yes"]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */

    public function createWorkoutLog (Request $request) {

        $request->validate([
            'userId' => 'required|string',
            'expertiseLevel' => 'required|enum',
        ]);
        $userId = $request->userId;
        $findUser = User::where("userId", $userId)->first();
        if(!$findUser) {
            return response()->json(["error"=>"User does not exist"],401);
        }
        $createdWorkoutLog = new WorkoutLog;
        $createdWorkoutLog->expertise_level = $request->expertiseLevel;
        $createdWorkoutLog->softDeletes();
        $createdWorkoutLog->save();
        return response()->json(["newWorkoutLog"=>$createdWorkoutLog]);
    }
}
