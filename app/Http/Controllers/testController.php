<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class testController extends Controller
{
    //
    public function test (Request $request)
    {
        return response()->json(["msg"=>"test", "peter"=>"thomas","private key"=>env('PASSPORT_PRIVATE_KEY'),"publick key"=>env("PASSPORT_PUBLIC_KEY")]);
    }
}
