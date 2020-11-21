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
    public function createWorkoutLog (Request $request):JsonReponse 
  {

        $request->validate([
            'userId' => 'required|string',
        ]);
        $userId = $request->userId;
        $findUser = User::where("id", $userId)->first();
        if(!$findUser) {
            return response()->json(["error"=>"User does not exist"],401);
        }
        // TODO: create soft delete
        $createdWorkoutLog = new WorkoutLog;
        // $createdWorkoutLog->expertise_level = $request->expertiseLevel;
        $createdWorkoutLog->save();
        $findWorkoutLog = WorkoutLog::find($createdWorkoutLog->id);
        return response()->json(["newWorkoutLog"=>$findWorkoutLog]);
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
