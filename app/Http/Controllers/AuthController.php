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
            'email' => 'required|string',
            'password' => 'required|string|min:8',
        ]);

        $userEmail = $request->email;
        $findUser = User::where("Email",$userEmail)->first();
        if($findUser){
            return response()->json(["error"=>'User already exists'],401);
        }
        $createdUser = new User;
        $createdUser->email = $userEmail;
        $createdUser->first_name = $request->firstName;
        $createdUser->last_name = $request->lastName;
        $createdUser->password = $request->password;
        $createdUser->user_type="user";
        $createdUser->save();

        $userToken = auth()->login($createdUser);

        return $this->RespondWithToken($userToken, $createdUser->id, $createdUser->user_type);
    }
    /**
     * Get the token array structure.
     *
     * @param string $token
     * @param int $userId
     * @param string $userType
     * @return JsonResponse
     */
    private function RespondWithToken(string $token, int $userId, $userType): JsonResponse
    {
        return response()->json([
            'accessToken' => $token,
            'tokenType' => 'bearer',
            'expiresIn' => auth()->factory()->getTTL(),
            'id' => $userId,
            'userType' => $userType,
        ]);
    }
}
