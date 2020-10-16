<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exercise;

class ExerciseController extends Controller
{
    //
    public function exercise (Request $request)
    {
        // $dummyData = new Exercise();
        // $dummyData->body_part = 'chest';
        // $dummyData->exercise_name = 'bench press';
        // $dummyData->save();

        // return response()->json(["msg"=>$dummyData]);
    }
    
    public function chest (Request $request)
    {
        return response()->json(["msg"=>"chest", "exercise"=>"incline"]);
    }
}
