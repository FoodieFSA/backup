<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Exception;
use http\Env\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;


class AuthController extends Controller
{

    function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerUser','loginUser','refreshToken']]);

    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function loginUser(Request $request):JsonResponse
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

        $credentials = $request->only('email', 'password');

        if(Auth::attempt($credentials)) {
            $responseTokens = $this->getTokens($request->email,$request->password);
            $cookie = cookie('jid', $responseTokens->refresh_token, 45000);
            return $this->RespondWithToken($responseTokens,  $findUser->user_type,$findUser,$cookie);
        }else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function refreshToken(Request $request):JsonResponse
    {
        $hasToken = $request->hasCookie('jid');
        if(!$hasToken){
            return response()->json(["accessToken"=>""]);
        }

        try {
            $req = Request::create('http://localhost/oauth/token', 'POST', [
                'grant_type' => 'refresh_token',
                'refresh_token' => Cookie::get('jid'),
                'client_id' => env('CLIENT_ID'),
                'client_secret' => env('CLIENT_SECRET'),
                'scope' => '*',
            ]);

            $res = app()->handle($req);
            $responseTokens = json_decode($res->getContent());
            $cookie = cookie('jid', $responseTokens->refresh_token, 45000);
            return response()->json([
                'accessToken' =>  $responseTokens->access_token,
                'tokenType' =>  $responseTokens->token_type,
                'expiresIn' =>  Carbon::now()->addSeconds( $responseTokens->expires_in),
            ])->withCookie($cookie);

        }catch(Exception $e){
            return response()->json(["accessToken"=>"","error"=>$e]);
        }

    }


    private function getTokens(String $userEmail,String $userPassword)
    {
        $req = Request::create('http://localhost/oauth/token', 'POST',[
            'grant_type' => 'password',
            'client_id' => env('CLIENT_ID'),
            'client_secret' => env('CLIENT_SECRET'),
            'username' => $userEmail,
            'password' => $userPassword,
            'scope' => '*',
        ]);
        $res = app()->handle($req);
        return json_decode($res->getContent());
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

//        $userToken = auth()->login($createdUser);
        Auth::attempt(['email' => $createdUser->email, 'password' =>   $createdUser->password]);
        return $this->RespondWithToken( 'sdsd', $createdUser->user_type,$createdUser);
    }
    /**
     * Get the token array structure.
     * @param object $tokens
     * @param string $userType
     * @param object $actualUser
     * @param object $cookie
     * @return JsonResponse
     */
    private function RespondWithToken(object $tokens, String $userType, object $actualUser, object $cookie): JsonResponse
    {
        return response()->json([
            'accessToken' => $tokens->access_token,
            'tokenType' => $tokens->token_type,
            'expiresIn' =>  Carbon::now()->addSeconds($tokens->expires_in),
            'id' => $actualUser->id,
            'userType' => $userType,
            'userData'=>$actualUser
        ])->withCookie($cookie);
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
