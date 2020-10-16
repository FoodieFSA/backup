<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/*

*/
class CreateExercisesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exercises', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer('log_id')->nullable();
            $table->string('body_part')->nullable();
            $table->string('exercise_name')->nullable();
            $table->integer('exercise_set')->nullable();
            $table->integer('exercise_weight')->nullable();
            $table->integer('exercise_rep')->nullable();
            // TODO: add a soft delete
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exercises');
    }
}
