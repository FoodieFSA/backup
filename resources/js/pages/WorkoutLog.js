import { useState } from 'react'
import { Button } from '@material-ui/core'
import produce from 'immer'
import SingleExercise from '../Components/SingleExercise'
import ExerciseModal from '../Components/ExerciseModal'

const WorkoutLog = () => {
  const initialExercise = {
    exerciseName: 'Bench Press',
    set: 0,
    LBS: 0,
    reps: 0,
    complete: false
  }

  const [state, setState] = useState({
    workoutLogName: 'MONDAY WORKOUT',
    exerciseSets: [],
    modalOpen: false
  })

  // Modal logic
  const handleOpen = () => {
    setState(
      produce((draftState) => {
        draftState.modalOpen = !state.modalOpen
      })
    )
  }

  const handleExerciseChange = (
    exerciseId,
    setId,
    incomingExerciseName,
    incomingSet,
    incomingLBS,
    incomingReps,
    incomingComplete
  ) => {
    const tempExercise = state.exerciseSets[exerciseId][setId]
    setState(
      produce((draftState) => {
        draftState.exerciseSets[exerciseId][setId].exerciseName =
          incomingExerciseName || tempExercise.exerciseName
        draftState.exerciseSets[exerciseId][setId].set =
          incomingSet || tempExercise.set
        draftState.exerciseSets[exerciseId][setId].LBS =
          incomingLBS || tempExercise.LBS
        draftState.exerciseSets[exerciseId][setId].reps =
          incomingReps || tempExercise.reps
        draftState.exerciseSets[exerciseId][setId].complete =
          incomingComplete === null ? tempExercise.complete : incomingComplete
      })
    )
  }

  // TODO need the remove exercise function and remove set function
  // Adds the new exercise and closes the modal after
  const handleSubmit = () => {
    console.log('STATE', state)
    setState(
      produce((draftState) => {
        draftState.exerciseSets.push([{ ...initialExercise }])
      })
    )

    handleOpen()
  }
  const addNewSet = (exerciseIndex, prevSetNum = 0) => {
    const tempSet = { ...initialExercise }
    tempSet.set = prevSetNum
    setState(
      produce((draftState) => {
        draftState.exerciseSets[exerciseIndex].push({ ...tempSet })
      })
    )
  }

  return (
    <div style={{ flex: 1 }}>
      <h2 id="workoutlog-title">{state.workoutLogName}</h2>
      {state.exerciseSets &&
        state.exerciseSets.map((exercise, index) => {
          return (
            <SingleExercise
              key={index}
              exerciseId={index}
              exercise={exercise}
              handleExerciseChange={handleExerciseChange}
              addNewSet={addNewSet}
            />
          )
        })}

      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add a New Exercise
      </Button>

      <ExerciseModal
        handleOpen={handleOpen}
        open={state.modalOpen}
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

export default WorkoutLog
