import { useState } from 'react'
import { Button, IconButton, TextField } from '@material-ui/core'
import produce from 'immer'
import SingleExercise from '../Components/SingleExercise'
import ExerciseModal from '../Components/ExerciseModal'
import { connect } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit';
import { editWorkoutLogName } from '../store'
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
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>
        <IconButton aria-label="delete" style={{ backgroundColor: 'gray', marginLeft: '15px', marginRight: '15px', width: '50px', height: '50px' }} onClick={() => setEditName(!editName)} >
          <EditIcon style={{ color: 'white' }}/>
        </IconButton>
        {editName ? <TextField
          style={{ marginLeft: '15px', marginRight: '15px' }}
          value = {workoutLog.workoutLogName}
          variant="outlined"
          onChange={(e) => editWorkoutLogName(e.target.value)}
        />
          : <h2>{workoutLog.workoutLogName}</h2>
        }
      </div>
      {
        workoutLog && workoutLog.exercises.map((exercise, index) => {
          return (
            <SingleExercise key={index} exerciseIndex={index} exercise={exercise}/>
          )
        })
      }
      <Button variant="contained" style={{ marginTop: '10px' }} color="primary" onClick={toggleModal}>
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
const mapDispatch = (dispatch) => {
  return {
    editWorkoutLogName: (userInput) => dispatch(editWorkoutLogName(userInput))
  }
}

export default connect(mapState, mapDispatch)(WorkoutLog)
