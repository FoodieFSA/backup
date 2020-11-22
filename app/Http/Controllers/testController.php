<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class testController extends Controller
{
    //
    public function test (Request $request)
    {
        $users=User::all();
//        $req = Request::create('https://backupfsa.herokuapp.com/oauth/token', 'POST', [
//            'grant_type' => 'password',
//            'client_id' => getenv('CLIENT_ID'),
//            'client_secret' => getenv('CLIENT_SECRET'),
//            'username' => $userEmail,
//            'password' => $userPassword,
//            'scope' => '*',
//        ]);
//        $res = app()->handle($req);
//       $tets = json_decode($res->getContent());
        return response()->json(["msg"=>"test", "peter"=>"thomas","users"=>$users]);
    }
}
