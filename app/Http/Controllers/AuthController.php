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
        $this->middleware('auth:api', ['except' => ['registerUser','loginUser','deleteUser']]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function loginUser(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string|min:8',
        ]);

        $userEmail = $request->email;
        $findUser = User::where("Email",$userEmail)->first();
        if(!$findUser){
            return response()->json(["error"=>'User does not exist'],401);
        }
        $userToken = auth()->login($findUser);

        return $this->RespondWithToken($userToken,  $findUser->user_type,$findUser);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth()->logout();
        return response()->json(['message' => 'Successfully invalidated token']);
    }
    /**
     * @param Request $request
     * @return JsonResponse
     */
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

        return $this->RespondWithToken($userToken, $createdUser->user_type,$createdUser);
    }
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getUser(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string|min:8',
        ]);

        $userEmail = $request->email;
        $findUser = User::where("Email",$userEmail)->first();
        if(!$findUser){
            return response()->json(["error"=>'User does not exist'],401);
        }
        $userToken = auth()->login($findUser);

        return $this->RespondWithToken($userToken, $findUser);
    }

    /**
     * Get the token array structure.
     * @param string $token
     * @param string $userType
     * @param object $actualUser
     * @return JsonResponse
     */
    private function RespondWithToken(string $token, String $userType, object $actualUser): JsonResponse
    {
        return response()->json([
            'accessToken' => $token,
            'tokenType' => 'bearer',
            'expiresIn' => auth()->factory()->getTTL(),
            'id' => $actualUser->id,
            'userType' => $userType,
            'userData'=>$actualUser
        ]);
    }
    /**
     * @return JsonResponse
     * soft delete user
     * TODO can add more security level to prevent mistake delete (EX:require password)
     */
    public function deleteUser(): JsonResponse
    {
        $userId = auth()->user()->id;
        auth()->logout();
        User::find($userId)->delete();
        return response()->json(["msg" => 'Account has been deleted']);
    }
}
