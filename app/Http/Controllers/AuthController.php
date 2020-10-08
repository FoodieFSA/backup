<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;

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
            'Password' => 'required|string|min:8'
        ]);

        $userEmail = $request->Email;
        $findUser = User::where("Email",$userEmail)->get();
//        if(!$findUser){
//            return Response("UserNotFound",401)->json(['User already exists']);
//        }
        $createdUser = new User;
        $createdUser->name="bac";
        $createdUser->email = $userEmail;
//        $createdUser->name = $request->Name;
        $createdUser->password = $request->Password;
        $createdUser->save();
//

//        $templateType = 'brand';
//        $this->userInfo->CreateOrganization($createdUser->id, $templateType);
        $userToken = auth()->login($createdUser);
        return Response()->json(["hell"=>$request->Email ,"token"=>$findUser]);
    }

}
