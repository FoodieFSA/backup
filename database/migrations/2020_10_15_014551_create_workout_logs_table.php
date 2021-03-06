<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWorkoutLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workout_logs', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable();
            // TODO: add a soft delete
            $table->enum('expertise_level', ['beginner', 'intermediate', 'expert'])->default('beginner');
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
        Schema::dropIfExists('workout_logs');
    }
}
