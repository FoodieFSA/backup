<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExerciseSet extends Model
{
    use HasFactory;
    
    /**
     * Get the WorkoutLog that owns the ExerciseSet.
     */
    public function workoutLog()
    {
        return $this->belongsTo('App\Models\WorkoutLog');
    }

    /**
     * Get the Exercise associated with the ExerciseSet
     */
    public function exercise()
    {
        return $this->hasOne('App\Models\Exercise');
    }
}
