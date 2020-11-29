import { Checkbox, Button } from '@material-ui/core'
import '../../css/singleExercise.css'
import { removeExercise, toggleCompleteSet, addExerciseSet, removedSet } from '../store'
import { connect } from 'react-redux'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const SingleExercise = ({ exercise, exerciseIndex, toggleCompleteSet, addExerciseSet, removedSet, removeExercise }) => {
  const columnHeader = ['Set', 'lbs', 'repetition', 'Complete']
  // const toggleComplete = (setId, isComplete) => { handleExerciseChange(exerciseId, setId, null, null, null, null, !isComplete) }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h2 style={{ textAlign: 'left', paddingLeft: '5%' }}>{exercise.name}</h2>
        <Button variant="contained" color="secondary"
          style={{ margin: '15px' }}
          onClick={() => removeExercise(exerciseIndex)}
          startIcon={<DeleteForeverIcon />}>
            Remove Exercise
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            {columnHeader.map((columnName, index) => {
              return <th key={index}>{columnName.toUpperCase()}</th>
            })}
            <th id = 'addSet'>
              <Button onClick={() => addExerciseSet(exerciseIndex)}>Add set</Button>
            </th>
          </tr>

        </thead>
        <tbody >
          {
            exercise && exercise.sets.map((singleExercise, index) => {
              return <tr key ={index} >
                <td>{ index + 1}</td>
                <td>{singleExercise.lbs}</td>
                <td>{singleExercise.reps}</td>
                <td>
                  <Checkbox
                    checked={singleExercise.completeStatus}
                    onChange={() => toggleCompleteSet(exerciseIndex, index)}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </td>
                <td >
                  <Button variant="contained" color="secondary" onClick={() => removedSet(exerciseIndex, index)} >Delete Set</Button>
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
    removeExercise: (exerciseIndex) => dispatch(removeExercise(exerciseIndex))
  }
}
export default connect(null, mapDispatch)(SingleExercise)
