<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{

    function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerUser']]);

    }
    public function registerUser(Request $request): JsonResponse
    {
        $request->validate([
            'Email' => 'required|string',
            'Password' => 'required|string|min:8',
            'Name'=>'required|string',
        ]);

        $userEmail = $request->Email;
        $findUser = User::where("Email",$userEmail)->first();
        if($findUser){
            return Response()->json(["msg"=>'User already exists']);
        }
        $createdUser = new User;
        $createdUser->email = $userEmail;
        $createdUser->name = $request->Name;
        $createdUser->password = $request->Password;
        $createdUser->save();

        $userToken = auth()->login($createdUser);
        return Response()->json(["user"=>$createdUser,"token"=> $userToken ]);
    }

}
