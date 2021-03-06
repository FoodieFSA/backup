<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;

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
    public function getMyself(Request $request):JsonResponse
    {
        $request->validate([
            'id' => 'required|string',
        ]);
        $findUser = User::find($request->id);
        $authUser = Auth::user();

        if(!$authUser){
            Auth::login($findUser);
            $authUser = Auth::user();
        }

        if($findUser->id == $authUser->id){
            return response()->json($authUser);
        }else{
            return response()->json(['error'=>"id does not match"],401);
        }
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
            return response()->json(['error' => 'Email or password does not match' ], 401);
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
            $appUrl = env('APP_URL','https://keepupfsa.herokuapp.com');
            $req = Request::create( $appUrl.'/oauth/token', 'POST', [
                'grant_type' => 'refresh_token',
                'refresh_token' => Cookie::get('jid'),
                'client_id' => getenv('CLIENT_ID'),
                'client_secret' => getenv('CLIENT_SECRET'),
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

    /**
     * @param String $userEmail
     * @param String $userPassword
     * TODO the call for oauth(freshToken and accessToken) call be split into difference class
     */
    private function getTokens(String $userEmail,String $userPassword)
    {

        try {
            $appUrl = env('APP_URL','https://keepupfsa.herokuapp.com');
            $req = Request::create($appUrl.'/oauth/token', 'POST', [
                'grant_type' => 'password',
                'client_id' => getenv('CLIENT_ID'),
                'client_secret' => getenv('CLIENT_SECRET'),
                'username' => $userEmail,
                'password' => $userPassword,
                'scope' => '*',
            ]);
            $res = app()->handle($req);
            return json_decode($res->getContent());
        }catch (Exception $e){
            return  json_decode($e);
        }
    }

    /**
     * @return JsonResponse
     * https://stackoverflow.com/questions/43318310/how-to-logout-a-user-from-api-using-laravel-passport
     * https://laracasts.com/discuss/channels/laravel/laravel-passport-how-to-logout-user?page=0
     * http://esbenp.github.io/2017/03/19/modern-rest-api-laravel-part-4/
     */
    public function logoutUser(): JsonResponse
    {
        if (Auth::check()) {
            $accessToken = Auth::user()->token();
            $refreshToken = DB::table('oauth_refresh_tokens')
                ->where('access_token_id', $accessToken->id)
                ->update(['revoked' => true]);
            $accessToken->revoke();

            // log user out from all devices
//            DB::table('oauth_access_tokens')
//                ->where('user_id', Auth::user()->id)
//                ->update([
//                    'revoked' => true
//                ]);
            return response()->json(['isLoggedOut' => true])->withCookie(cookie("jid","", 0));
        }

        return response()->json(['isLoggedOut' =>false]);
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

        Auth::attempt(['email' => $request->email, 'password' =>$request->password]);
        $responseTokens = $this->getTokens($userEmail,  $request->password);
        //testing
//        $responseTokens=collect(["refresh_token"=>123,"token_type"=>'sdsds',"access_token"=>123232,'expires_in'=>1000]);
        $cookie = cookie('jid', $responseTokens->refresh_token, 45000);
        return $this->RespondWithToken($responseTokens, $createdUser->user_type,$createdUser, $cookie);
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
