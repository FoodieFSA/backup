<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WorkoutLogController extends Controller
{
    //
    public function storeLog (Request $request) {
        return response()->json(["stored"=>"yes"]);
    }
}
