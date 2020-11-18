<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    function __construct()
    {
        $this->middleware('auth:api', ['except' => ['registerUser','loginUser','deleteUser']]);

    }

    /**
     * @param Request $request
     */
    public function loginUser(Request $request)
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

            $tokens=$this->getTokens($request->email,$request->password);
//            response.cookie('jid',tokens->refresh_token,);
//            ->json($tokens)

//            $response = new \Illuminate\Http\Response('Test');
//            $response->withCookie(cookie('test', 'test', 45000));
            $cookie = cookie('test', "test", 45000);
            return response("Sdsdsd")->header('Content-Type',  'application/json; charset=UTF-8')
                ->withCookie($cookie);
//            return response("hello")->withCookie(cookie('jid', $tokens->refresh_token, 60));
//            return response()->json([
//                'access_token' =>  $accessTokenResult->accessToken,
//                'token_type' => 'Bearer',
//                'token_type' => 'Bearer',
//                'expires_at' => Carbon::parse($accessTokenResult->token->expires_at)->toDateTimeString()
//            ]);
        }else {
            echo "Fail";
            return response()->json(['message' => 'Unauthorized'], 401);
        }



        //$user = $request->user();

//        $tokenResult = $user->createToken('Personal Access Token');
//        $token = $tokenResult->token;
//        if ($request->remember_me)
//            $token->expires_at = Carbon::now()->addWeeks(1);
//        $token->save();
//        return response()->json([
//            'access_token' => $tokenResult->accessToken,
//            'token_type' => 'Bearer',
//            'expires_at' => Carbon::parse(
//                $tokenResult->token->expires_at
//            )->toDateTimeString()
//        ]);
//        $userToken = auth()->login($findUser);
//        response.cookie(['jid'=>$userToken,[httpOnly=>true]]);
//        return $this->RespondWithToken("sdsdsdsdsd",  $findUser->user_type,$findUser);
//        return $this->RespondWithToken($userToken,  $findUser->user_type,$findUser);
    }


    private function getTokens(String $userEmail,String $userPassword)
    {
        $req = Request::create('https://8728a0b507cf.ngrok.io/oauth/token', 'POST',[
            'grant_type' => 'password',
            'client_id' => '11',
            'client_secret' => '58EutzT0MPahGc0YbpS8yZeZe9O8n1DKHQdODNBY',
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
//            'expiresIn' => auth()->factory()->getTTL(),
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
