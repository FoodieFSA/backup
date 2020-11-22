<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Passport\HasApiTokens;
use Illuminate\Support\Facades\Hash;
/**
 * @method static find($userId)
 * @method static create(array $array)
 */
class User extends Authenticatable
{
    use HasFactory, Notifiable,SoftDeletes,HasApiTokens;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [];
    //https://medium.com/employbl/build-authentication-into-your-laravel-api-with-json-web-tokens-jwt-cd223ace8d1a
    //https://jwt-auth.readthedocs.io/en/docs/quick-start/#update-your-user-model
    public function getAuthIdentifier()
    {
        Return $this->getKey();
    }
//
//    /**
//     * @return array
//     */
//    public function getJWTCustomClaims(): array
//    {
//        return [];
//    }

    /**
     * @param string $password
     */
    public function setPasswordAttribute(string $password): void
    {
        if (!empty($password)) {
            $this->attributes['password'] =Hash::make($password);
        }
    }
}
