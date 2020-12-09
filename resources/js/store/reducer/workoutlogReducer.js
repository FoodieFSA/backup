import Api from '../../Api';
import produce from 'immer';
import moment from 'moment';
/**
 * ACTION TYPES
 */
// for workouts
const GOT_WORKOUT = 'GOT_WORKOUT';
const ADDED_EXERCISE = 'ADDED_EXERCISE';
const REMOVED_EXERCISE = 'REMOVED_EXERCISE';
const EDIT_WORKOUT_NAME = 'EDIT_WORKOUT_NAME';
// for set
const ADDED_SET = 'ADDED_SET';
const UPDATED_SET_LBS = 'UPDATED_SET_LBS';
const UPDATED_SET_REPS = 'UPDATED_SET_REPS';
const REMOVED_SET = 'REMOVED_SET';
const COMPLETE_SET = 'COMPLETE_SET';
// const SAVED = "SAVED"

/**
 * INITIAL STATE
 */
const initialStateWorkout = {
  // TODO: use moment to name workoutlogname today's date
  id: -1,
  name: moment.now(), // day of month    DATE.NOW()
  userId: '',
  // adding exercise objects into the exercises array
  exercises: []
  // modalOpen: false,
};

// initial state for set
const emptySet = { lbs: 0, reps: 0, completeStatus: false };

// {
//   id:"",
//   name: "",
//   sets: [{lbs: 0, rep: 0, completeStatus: false}],
// }

// for exercise section...........................
const gotWorkoutLog = (workout) => ({ type: GOT_WORKOUT, workout });

export const addExercise = (exercise) => ({ type: ADDED_EXERCISE, exercise });
export const removeExercise = (exerciseIndex) => ({
  type: REMOVED_EXERCISE,
  exerciseIndex
});
export const editWorkoutLogName = (inputName) => ({
  type: EDIT_WORKOUT_NAME,
  inputName
});
// for set section...........................
// const removedSet = (exerciseId, set) => ({ type: REMOVED_SET, exerciseId, set })
// const updatedSet = (exerciseId, set) => ({ type: UPDATED_SET, exerciseId, set })

export const updateSetLbs = (exerciseIndex, setIndex, userInputLbs) => ({
  type: UPDATED_SET_LBS,
  exerciseIndex,
  setIndex,
  userInputLbs
});
export const updateSetReps = (exerciseIndex, setIndex, userInputReps) => ({
  type: UPDATED_SET_REPS,
  exerciseIndex,
  setIndex,
  userInputReps
});
export const toggleCompleteSet = (exerciseIndex, setIndex) => ({
  type: COMPLETE_SET,
  exerciseIndex,
  setIndex
});
export const addExerciseSet = (exerciseIndex) => ({
  type: ADDED_SET,
  exerciseIndex
});
export const removedSet = (exerciseIndex, setIndex) => ({
  type: REMOVED_SET,
  exerciseIndex,
  setIndex
});
/*
TODO:
- need to account for same day workout -> thinking to use Date as identifier for workout objects
*/

/**
 * THUNK CREATORS
 */

// thunk to get workout log, we are assuming user has field for an array of workoutlogs
export const getWorkoutLog = (logId) => async (dispatch) => {
  try {
    // TODO: add workoutLogs field to user, and get the log id response
    const response = await Api.get(`workoutlog/${logId}`);
    if (response) {
      dispatch(gotWorkoutLog(response.data));
    } else {
      console.error('This record doesn\'t exist');
    }
  } catch (error) {
    console.log(error);
  }
};

export const createWorkoutLog = async (workout) => {
  try {
    // Need to change to have a name
    // Need more work
    await Api.post('workoutlog', workout);
  } catch (error) {
    console.log(error);
  }
};

// thunk to save changins of workoutlog to the backend
export const updateWorkoutLog = async (workout) => {
  try {
    // TODO: finish adding workoutlog id

    await Api.put(`/workoutLog/${workout.id}`);
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */

const workoutlogReducer = produce((draft, action) => {
  switch (action.type) {
    case GOT_WORKOUT: {
      return action.workout;
    }
    // exercise action section..............................................................
    case EDIT_WORKOUT_NAME: {
      draft.workoutLogName = action.inputName;
      return draft;
    }
    case ADDED_EXERCISE: {
      const tempExercise = {
        ...action.exercise,
        sets: [{ ...emptySet }]
      };
      draft.exercises.push(tempExercise);
      return draft;
    }
    case REMOVED_EXERCISE: {
      draft.exercises = draft.exercises.filter(
        (singleExercise, index) => index !== action.exerciseIndex
      );
      return draft;
    }
    // set action section..............................................................
    case COMPLETE_SET: {
      draft.exercises[action.exerciseIndex].sets[
        action.setIndex
      ].completeStatus = !draft.exercises[action.exerciseIndex].sets[
        action.setIndex
      ].completeStatus;
      return draft;
    }
    case REMOVED_SET: {
      draft.exercises[action.exerciseIndex].sets = draft.exercises[
        action.exerciseIndex
      ].sets.filter((singleSet, index) => index !== action.setIndex);

      if (draft.exercises[action.exerciseIndex].sets.length === 0) {
        draft.exercises = draft.exercises.filter(
          (singleExercise, index) => index !== action.exerciseIndex
        );
      }
      return draft;
    }
    case ADDED_SET: {
      draft.exercises[action.exerciseIndex].sets.push({ ...emptySet });
      return draft;
    }
    case UPDATED_SET_LBS: {
      if (action.userInputLbs >= 0) {
        draft.exercises[action.exerciseIndex].sets[
          action.setIndex
        ].lbs = action.userInputLbs;
      } else {
        alert(
          'The pound can not accept negative input number,please try the number that bigger than zero!'
        );
      }
      return draft;
    }
    case UPDATED_SET_REPS: {
      if (action.userInputReps >= 0) {
        draft.exercises[action.exerciseIndex].sets[
          action.setIndex
        ].reps = action.userInputReps;
      } else {
        alert(
          'The repetition can not accept negative input number,please try the number that bigger than zero!'
        );
      }
      return draft;
    }
    default:
      return draft;
  }
}, initialStateWorkout);

export default workoutlogReducer;
