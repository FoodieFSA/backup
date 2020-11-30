import { Checkbox, Button, TextField, IconButton } from '@material-ui/core'
import '../../css/singleExercise.css'
import { removeExercise, toggleCompleteSet, addExerciseSet, removedSet, updateSetLbs, updateSetReps } from '../store'
import { connect } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close';

const SingleExercise = ({
  exercise, exerciseIndex,
  toggleCompleteSet, addExerciseSet,
  removedSet, removeExercise,
  updateSetLbs, updateSetReps
}) => {
  return (
    <>
      <div id='exerciseHeader'>
        <h2 >{exercise.name}</h2>
        <Button variant="contained" color="secondary"
          onClick={() => removeExercise(exerciseIndex)}
        >
            Remove Exercise
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th >Set</th>
            <th style={{ maxWidth: '80px', minWidth: '60px' }}>Lbs</th>
            <th style={{ maxWidth: '70px', minWidth: '60px' }}>Reps</th>
            <th >Complete</th>
            <th id ='addSet'>
              <Button onClick={() => addExerciseSet(exerciseIndex)}>Add set</Button>
            </th>
          </tr>

        </thead>
        <tbody >
          {
            exercise && exercise.sets.map((singleExercise, index) => {
              return <tr key ={index} >
                <td>{ index + 1}</td>
                <td>
                  <TextField
                    onChange={(event) => updateSetLbs(exerciseIndex, index, event.target.value)}
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                      shrink: true
                    }}
                    value={singleExercise.lbs}/>
                </td>
                <td>
                  <TextField
                    onChange={(event) => updateSetReps(exerciseIndex, index, event.target.value)}
                    type="number"
                    InputLabelProps={{
                      shrink: true
                    }}
                    variant="outlined" value={singleExercise.reps}/>
                </td>
                <td>
                  <Checkbox
                    checked={singleExercise.completeStatus}
                    onChange={() => toggleCompleteSet(exerciseIndex, index)}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </td>
                <td >
                  <IconButton aria-label="delete" style={{ backgroundColor: 'red' }} onClick={() => removedSet(exerciseIndex, index)} >
                    <CloseIcon style={{ color: 'white' }}/>
                  </IconButton>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  )
}

const mapDispatch = (dispatch) => {
  return {
    toggleCompleteSet: (exerciseIndex, setIndex) => dispatch(toggleCompleteSet(exerciseIndex, setIndex)),
    addExerciseSet: (exerciseIndex) => dispatch(addExerciseSet(exerciseIndex)),
    removedSet: (exerciseIndex, setIndex) => dispatch(removedSet(exerciseIndex, setIndex)),
    removeExercise: (exerciseIndex) => dispatch(removeExercise(exerciseIndex)),
    updateSetLbs: (exerciseIndex, setIndex, userInputLbs) => dispatch(updateSetLbs(exerciseIndex, setIndex, userInputLbs)),
    updateSetReps: (exerciseIndex, setIndex, userInputReps) => dispatch(updateSetReps(exerciseIndex, setIndex, userInputReps))
  }
}
export default connect(null, mapDispatch)(SingleExercise)
