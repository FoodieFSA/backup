import { useState } from 'react'
import { Button } from '@material-ui/core'
import produce from 'immer'
import SingleExercise from '../Components/SingleExercise'
import ExerciseModal from '../Components/ExerciseModal'
import { connect } from 'react-redux'
const WorkoutLog = ({ workoutLog }) => {
  const [state, setState] = useState({
    workoutLogName: 'MONDAY WORKOUT',
    exerciseSets: [],
    modalOpen: false
  })

  // Modal logic
  const toggleModal = () => {
    setState(produce((draftState) => {
      draftState.modalOpen = !state.modalOpen
    }))
  }

  return (
    <div style={{ flex: 1 }}>
      <h2 id="workoutlog-title">{workoutLog.workoutLogName}</h2>
      {
        workoutLog && workoutLog.exercises.map((exercise, index) => {
          return (
            <SingleExercise key={index} exerciseIndex={index} exercise={exercise}/>
          )
        })
      }
      <Button variant="contained" color="primary" onClick={toggleModal}>
        Add a New Exercise
      </Button>
      <ExerciseModal toggleModal={toggleModal} open={state.modalOpen}/>
    </div>
  )
}

const mapState = (state) => {
  return {
    workoutLog: state.workoutLog
  }
}

export default connect(mapState, null)(WorkoutLog)
