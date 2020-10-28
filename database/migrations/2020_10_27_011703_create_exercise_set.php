<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExerciseSet extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exercise_set', function (Blueprint $table) {
            $table->id();
            $table->integer('workoutlog_id');
            $table->integer('exercise_id');
            $table->timestamps();
            $table->boolean('complete')->default(true);
            $table->integer('weight')->nullable();
            $table->integer('rep')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exercise_set');
    }
}
