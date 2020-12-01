<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

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
    public function getMyself(Request $request):JsonResponse
    {
        return response()->json(Auth::user());
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
        $actualUser->socialAvatarUrl=$request->socialAvatarUrl;
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

    /**
     * @param Request $request
     * @return JsonResponse
     * https://medium.com/dev-genius/laravel-api-file-upload-to-aws-a8e87319b82e#26e0
     * https://medium.com/@sehmbimanvir/laravel-upload-files-to-amazon-s3-a17d013f53ce
     */
    public function uploadUserAvatar(Request $request):JsonResponse
    {
        $this->validate($request, [
            'id' => 'required',
            'avatar' => 'required|mimes:pdf,png,jpg,jpeg|max:9999',
        ]);

        if($request->hasFile('avatar')) {
            $path = $request->file('avatar')->storeAS('avatars/'.$request->id,$request->name, ['disk' => 's3', 'visibility' => 'public']);

            $result = Storage::disk('s3')->url($path);

            return response()->json($result);
        } else {
            return response()->json(['success' => false, 'message' => 'No file uploaded'], 400);
        }

    }

}
