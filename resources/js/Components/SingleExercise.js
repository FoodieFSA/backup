import { Checkbox, Button } from '@material-ui/core'

const SingleExercise = ({ exercise, handleExerciseChange, exerciseId, addNewSet }) => {
  const columnHeader = ['Set', 'lbs', 'repetition', 'Complete']
  const toggleComplete = (setId, isComplete) => { handleExerciseChange(exerciseId, setId, null, null, null, null, !isComplete) }

  return (
    <>
      <h2 style={{ textAlign: 'left', paddingLeft: '5%' }}>{exercise[0].exerciseName}</h2>
      <table style={{ width: '100vw', paddingLeft: '5%', paddingRight: '5%' }}>
        <thead>
          <tr>
            {columnHeader.map((columnName, index) => {
              return <th key={index}>{columnName.toUpperCase()}</th>
            })}
            <th style={{ width: '100px' }}>
              <Button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => addNewSet(exerciseId, exercise[exercise.length - 1].set + 1)}>Add set</Button>
            </th>
          </tr>

        </thead>
        <tbody >
          {
            exercise.map((singleExercise, index) => {
              return <tr key ={index} >
                <td>{singleExercise.set + 1}</td>
                <td>{singleExercise.LBS}</td>
                <td>{singleExercise.reps}</td>
                <td>
                  <Checkbox
                    checked={singleExercise.complete}
                    onChange={() => toggleComplete(index, singleExercise.complete)}
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default SingleExercise
