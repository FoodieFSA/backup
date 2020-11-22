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
        return response()->json(["msg"=>"test", "peter"=>"thomas","users"=>$users,"appurl"=>env('APP_URL')]);
    }
}
