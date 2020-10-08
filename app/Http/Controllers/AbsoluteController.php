<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AbsoluteController extends Controller
{
    /**
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }
}
