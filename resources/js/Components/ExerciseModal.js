import { useState } from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  RadioGroup,
  Radio,
  Button,
  FormControlLabel
} from '@material-ui/core';

import produce from 'immer';
import '../../css/exerciseModal.css';
import AppSearchInput from './AppSearchInput'
import { connect } from 'react-redux'
import { addExercise } from '../store'
// TODO use backend data for the search
const dummyData = [
  { id: 0, body_part: 'Chest', name: 'Bench Press' },
  { id: 1, body_part: 'Back', name: 'Deadlift' },
  { id: 2, body_part: 'Shoulders', name: 'Lateral Raises' },
  { id: 3, body_part: 'Legs', name: 'Barbell Back Squat' },
  { id: 4, body_part: 'Biceps', name: 'Dumbbell Curls' },
  { id: 5, body_part: 'Biceps', name: 'Dumbbell Curls' },
  { id: 6, body_part: 'Biceps', name: 'Dumbbell Curls' },
  { id: 7, body_part: 'Biceps', name: 'Dumbbell Curls' },
  { id: 8, body_part: 'Biceps', name: 'Dumbbell Curls' },
  { id: 9, body_part: 'Biceps', name: 'Dumbbell Curls' },
  { id: 10, body_part: 'Biceps', name: 'Dumbbell Curls' }
];

const ExerciseModal = ({ toggleModal, open, addExercise }) => {
  const [state, setState] = useState({
    searchResults: [...dummyData],
    searchInput: '',
    selectedExercise: ''
  });

  const searchExercises = (input) => {
    const searchResults = dummyData.filter((exercise) => {
      return exercise.name.toLowerCase().startsWith(input.toLowerCase());
    });

    setState(produce((draftState) => {
      draftState.searchResults = searchResults;
    }));
  };

  const handleSearchInput = (e) => {
    // Look into this e.persist?
    e.persist();
    setState(produce((draftState) => {
      draftState.searchInput = e.target.value;
    }));

    searchExercises(e.target.value);
  };

  const handleSelectedExercise = (e) => {
    e.persist();
    setState(
      produce((draftState) => {
        draftState.selectedExercise = e.target.value;
      })
    );
  };

  const handleAddSubmit = () => {
    addExercise(dummyData.find(exercise => exercise.name === state.selectedExercise))
    toggleModal()
  }

  return (
    <Modal
      // aria-labelledby="transition-modal-title"
      // aria-describedby="transition-modal-description"
      className="modal"
      open={open}
      onClose={toggleModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={open} style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="paper">
          <h2 id="modal-title">Pick an exercise</h2>
          <AppSearchInput searchValue={state.searchInput} handleSearchInput={handleSearchInput} placeHolder='Search Exercises'/>
          <div className="scroll">
            <RadioGroup
              aria-label="selectedExercise"
              name="selectedExercise"
              value={state.selectedExercise}
              onChange={handleSelectedExercise}
            >
              {state.searchResults.map((result, index) => {
                return (
                  <FormControlLabel
                    key={result.id}
                    value={result.name}
                    label={result.name}
                    id={index}
                    control={<Radio />}
                  >
                    {result.name}
                  </FormControlLabel>
                );
              })}
            </RadioGroup>
          </div>
          <Button id='addBtn' variant="contained" color="primary" onClick={handleAddSubmit}>
                        Add
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};
const mapDispatch = (dispatch) => {
  return {
    addExercise: (exercise) => dispatch(addExercise(exercise))
  }
}
export default connect(null, mapDispatch)(ExerciseModal);
