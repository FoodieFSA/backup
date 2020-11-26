<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends AbsoluteController
{
    function __construct()
    {
        parent::__construct();
    }
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function updateUser(Request $request):JsonResponse
    {
        $request->validate([
            'id' => 'required|integer',
        ]);

        $actualUser = User::find($request->id);
        $actualUser->first_name=$request->first_name;
        $actualUser->last_name=$request->last_name;
        $actualUser->user_gender =$request->user_gender;
        $actualUser->user_weight=$request->user_weight;
        $actualUser->user_height=$request->user_height;
        $actualUser->user_dob=$request->user_dob;
        $actualUser->save();

        return response()->json($actualUser);
    }
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getUser(Request $request): JsonResponse
    {
       $request->validate([
           'id' => 'required',
       ]);

        $findUser = User::find($request->id);
        if(!$findUser){
            return response()->json(["error"=>'User does not exist'],401);
        }
        return response()->json($findUser);
    }



}
