import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Modal,
  Input,
  Backdrop,
  Fade,
  InputAdornment,
  RadioGroup,
  Radio,
  Button,
  FormControlLabel
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import produce from 'immer'

const dummyData = [
  { id: 0, body_part: 'Chest', name: 'Bench Press' },
  { id: 1, body_part: 'Back', name: 'Deadlift' },
  { id: 2, body_part: 'Shoulders', name: 'Lateral Raises' },
  { id: 3, body_part: 'Legs', name: 'Barbell Back Squat' },
  { id: 4, body_part: 'Biceps', name: 'Dumbbell Curls' }
]

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
  // button: {
  //   backgroundColor: 'green',
  //   color: 'white',
  // },
}))

const ExerciseModal = ({ handleOpen, open, handleSubmit }) => {
  const classes = useStyles()

  const [state, setState] = useState({
    searchResults: [...dummyData],
    searchInput: '',
    selectedExercise: ''
  })

  const searchExercises = (input) => {
    const searchResults = dummyData.filter((exercise) => {
      return exercise.name.toLowerCase().startsWith(input.toLowerCase())
    })

    setState(
      produce((draftState) => {
        draftState.searchResults = searchResults
      })
    )
  }

  const handleSearchInput = (e) => {
    // Look into this e.persist?
    e.persist()

    console.log('THIS IS E.TARGET', e.target.name, e.target.value)
    setState(
      produce((draftState) => {
        draftState.searchInput = e.target.value
      })
    )

    searchExercises(e.target.value)
  }

  const handleSelectedExercise = (e) => {
    e.persist()

    setState(
      produce((draftState) => {
        draftState.selectedExercise = e.target.value
      })
    )
  }
  console.log('THIS SELECTED', state.selectedExercise)

  return (
    <Modal
      // aria-labelledby="transition-modal-title"
      // aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleOpen}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="modal-title">Pick an Exercise</h2>
          <Input
            id="searchInput"
            name="searchInput"
            value={state.searchInput}
            onChange={handleSearchInput}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
          <RadioGroup
            aria-label="selectedExercise"
            name="selectedExercise"
            value={state.selectedExercise}
            onChange={handleSelectedExercise}
          >
            {state.searchResults.map((result) => {
              return (
                <FormControlLabel
                  key={result.id}
                  value={result.name}
                  label={result.name}
                  control={<Radio />}
                >
                  {result.name}
                </FormControlLabel>
              )
            })}
          </RadioGroup>

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </div>
      </Fade>
    </Modal>
  )
}

export default ExerciseModal
