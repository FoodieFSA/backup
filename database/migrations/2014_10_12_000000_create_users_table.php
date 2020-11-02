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

        // TODO: change the table column to corrrectly reflect the db schema setup
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('socialAvatarUrl')->nullable();
            $table->string('email')->unique();
            $table->string('user_address')->nullable();
            $table->string('google_id')->nullable();
            $table->string('password');
            $table->enum('user_gender', ['Male', 'Female', 'Prefer not to say'])->default('Prefer not to say');
            $table->date('user_dob')->nullable();
            $table->integer('user_height')->nullable();
            $table->integer('user_weight')->nullable();
            $table->enum('user_type',['user','admin'])->default('user');
            $table->string('imageUrl')->nullable();
            $table->rememberToken();
            $table->timestamps();
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
