<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('socialAvatarUrl')->nullable();
            $table->string('email')->unique();
            $table->string('user_address')->nullable();
            $table->string('google_id')->nullable();
            $table->string('password');
            $table->string('user_gender')->nullable();
            $table->string('user_age')->nullable();
            $table->string('user_height')->nullable();
            $table->string('user_weight')->nullable();
            $table->enum('user_type',['user','admin'])->default('user');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
