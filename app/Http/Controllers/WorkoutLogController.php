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

     /**
     * @param Request $request
     * @return JsonResponse
     */
    
     public function createWorkoutLog (Request $request) :JsonReponse 
    {

        /*
        TODO:

        find user to attach workoutlog
        expertise level
        soft-deleted date
        */

        $request->validate([
            'userId' => 'required|string',
            'expertiseLevel' => 'required|enum',
            // 'deletedDate' => 'dateTime'
        ]);
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
     /**
     * @param Request $request
     * @return JsonResponse
     */

    public function getWorkoutLog (Request $request):JsonReponse 
    {

        $request->validate([
            'userId' => 'required|string'
        ]);
        $userId = $request->userId;
        $findWorkoutLog = WorkoutLog::where("user_id", "=", $userId) -> get();
        return response()->json(["workoutLogs"=>$findWorkoutLog]);
    }

     /**
     * @param Request $request
     * @return JsonResponse
     */

    public function getSingleWorkoutLog (Request $request):JsonReponse 
    {

        $request->validate([
            'userId' => 'required|string',
            'singleWorkoutLogId' => 'required|string'
        ]);
        $userId = $request->userId;
        $singleWorkoutLogId = $request->singleWorkoutLogId;
        $findWorkoutLog = WorkoutLog::where([["user_id", "=", $userId],["id","=",$singleWorkoutLogId]]) -> first();
        return response()->json(["workoutLogs"=>$findWorkoutLog]);
    }
    
     /**
     * @param Request $request
     * @return JsonResponse
     */

    public function updateWorkoutLog (Request $request):JsonReponse 
    {

        $request->validate([
            'userId' => 'required|string',
            'singleWorkoutLogId' => 'required|string',
        ]);
        $userId = $request->userId;
        $singleWorkoutLogId = $request->singleWorkoutLogId;
            // NEED more work 
    }
}
