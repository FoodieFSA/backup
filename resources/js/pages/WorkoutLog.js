import { useState } from 'react'
import { Button, IconButton, TextField } from '@material-ui/core'
import produce from 'immer'
import SingleExercise from '../Components/SingleExercise'
import ExerciseModal from '../Components/ExerciseModal'
import { connect } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import { editWorkoutLogName } from '../store'
import '../../css/workoutlog.css'

const WorkoutLog = ({ workoutLog, editWorkoutLogName }) => {
  const [state, setState] = useState({
    workoutLogName: 'MONDAY WORKOUT',
    exerciseSets: [],
    modalOpen: false
  })
  const [editName, setEditName] = useState(false)
  // Modal logic
  const toggleModal = () => {
    setState(produce((draftState) => {
      draftState.modalOpen = !state.modalOpen
    }))
  }

  return (
    <div style={{ flex: 1 }}>
      <div id='workoutHeader'>
        <div id='editNameContainer'>
          <IconButton aria-label="delete" id='editIcon' onClick={() => setEditName(!editName)} >
            <EditIcon style={{ color: 'white' }}/>
          </IconButton>
          {editName ? <TextField
            value = {workoutLog.workoutLogName}
            variant="outlined"
            onChange={(e) => editWorkoutLogName(e.target.value)}
          />
            : <h2 >{workoutLog.workoutLogName}</h2>
          }
        </div>
        <Button variant="contained" color="primary" id='saveIcon' startIcon={<SaveIcon />}>
                Save Workout
        </Button>
      </div>
      {
        workoutLog && workoutLog.exercises.map((exercise, index) => {
          return (
            <SingleExercise key={index} exerciseIndex={index} exercise={exercise}/>
          )
        })
      }
      <div id ='WorkoutBtns'>
        <Button variant="contained" color="primary" onClick={toggleModal}>
        Add a New Exercise
        </Button>
        <Button variant="contained" color="secondary" onClick={() => console.log('empty workout page')}>
            Cancel Workout
        </Button>
      </div>
      <ExerciseModal toggleModal={toggleModal} open={state.modalOpen}/>
    </div>
  )
}

const mapState = (state) => {
  return {
    workoutLog: state.workoutLog
  }
}
const mapDispatch = (dispatch) => {
  return {
    editWorkoutLogName: (userInput) => dispatch(editWorkoutLogName(userInput))
  }
}

export default connect(mapState, mapDispatch)(WorkoutLog)
