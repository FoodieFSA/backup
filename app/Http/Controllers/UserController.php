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
        return response()->json(["msg"=>$actualUser]);
    }
}
