import Api from '../../Api'
import produce from 'immer'
/**
 * ACTION TYPES
 */
// for workouts
const GOT_WORKOUTS = 'GOT_WORKOUTS'
const CREATED_WORKOUT = 'CREATED_WORKOUT'
const ADDED_EXERCISE = 'ADDED_EXERCISE'
const REMOVED_EXERCISE = 'REMOVED_EXERCISE'

// for set
const ADDED_SET = 'ADDED_SET'
const UPDATED_SET = 'UPDATED_SET'
const REMOVED_SET = 'REMOVED_SET'
const COMPLETE_SET = 'COMPLETE_SET'
// const SAVED = "SAVED"

/**
 * INITIAL STATE
 */
const initialStateWorkout = {

  // TODO: use moment to name workoutlogname today's date
  workoutLogName: '', // day of month    DATE.NOW()
  userId: '',
  // adding exercise objects into the exercises array
  exercises: []
  // modalOpen: false,
}

// initial state for set
const emptySet = { lbs: 0, reps: 0, completeStatus: false }

// {
//   id:"",
//   name: "",
//   sets: [{lbs: 0, rep: 0, completeStatus: false}],
// }

const gotWorkoutLog = (workout) => ({ type: GOT_WORKOUTS, workout })
const createdWorkout = (workout) => ({ type: CREATED_WORKOUT, workout })
export const addExercise = (exercise) => ({ type: ADDED_EXERCISE, exercise })
export const removeExercise = (exerciseIndex) => ({ type: REMOVED_EXERCISE, exerciseIndex })
// const removedSet = (exerciseId, set) => ({ type: REMOVED_SET, exerciseId, set })
const updatedSet = (exerciseId, set) => ({ type: UPDATED_SET, exerciseId, set })

export const toggleCompleteSet = (exerciseIndex, setIndex) => ({ type: COMPLETE_SET, exerciseIndex, setIndex })
export const addExerciseSet = (exerciseIndex) => ({ type: ADDED_SET, exerciseIndex })
export const removedSet = (exerciseIndex, setIndex) => ({ type: REMOVED_SET, exerciseIndex, setIndex })
/*
TODO:
- need to incoporate immer to the object
- need to account for same day workout -> thinking to use Date as identifier for workout objects
- need immer^ for this
*/

/**
 * THUNK CREATORS
 */

// thunk to get workout log, we are assuming user has field for an array of workoutlogs
export const getWorkoutLog = (logId, userId) => async (dispatch) => {
  try {
    // TODO: add workoutLogs field to user, and get the log id response
    const response = await Api.get(`workoutlog/${logId}`)
    if (response) {
      const localWorkoutLog = JSON.parse(localStorage.getItem('workoutLog'))
      if (localWorkoutLog.id === response.id) {
        // Local Storage data has precedence over data base one. We just replace the one from the data base
        gotWorkoutLog(localWorkoutLog)
      } else {
        gotWorkoutLog(response.data)
      }
    } else {
      const workoutLog = {
        name: Date.now(), // Need more work to get the day only without time
        userId: userId,
        exercises: []
      }
      const response = await Api.post('/workoutlog/', workoutLog)
      dispatch(createdWorkout(response.data))
      // Create a local storage workout
      // name, id, exercises
      localStorage.setItem('workoutLog', JSON.stringify(response.data))
    }
  } catch (error) {
    console.log(error)
  }
}

export const updateSet = (exerciseId, set) => async (dispatch) => {
  try {
    const localWorkout = JSON.parse(localStorage.getItem('workoutLog')).exercise.map(exercise => {
      if (exercise.id === exerciseId) {
        exercise.sets.map(currentSet => {
          if (currentSet.id === set.id) {
            return set
          } else {
            return currentSet
          }
        })
      }
      return exercise
    })
    localStorage.setItem('workoutLog', JSON.stringify(localWorkout))
    dispatch(updatedSet(exerciseId, set))
  } catch (error) {
    console.error(error)
  }
}

// thunk to save changins of workoutlog to the backend
// export const save = () => async (dispatch) => {
//   try {
//     // TODO: finish adding workoutlog id

//     await Api.put('/workoutLog/id')
//     dispatch(save())
//   } catch (error) {
//     console.error(error)
//   }
// }

/**
 * REDUCER
 */
// export default function (state = initialStateWorkout, action) {
//   switch (action.type) {
//     case GOT_WORKOUTS:
//       return action.workout
//     case CREATED_WORKOUT:
//       return action.workout
//     case ADDED_EXERCISE:
//       return { ...state, exercises: [...state.exercises, { ...action.exercise, sets: [{ ...emptySet }] }] }
//     case REMOVED_EXERCISE:
//       return { ...state, exercises: state.exercises.filter(exercise => exercise.id !== action.id) }
//     case ADDED_SET: {
//       const tempExercises = [...state.exercises]
//       const oldExercises = tempExercises.map((exercise, index) => {
//         if (index === action.exerciseIndex) {
//           exercise.sets.push({ ...emptySet })
//         }
//         return { ...exercise }
//       })
//       return { ...state, exercises: oldExercises }
//     }
//     case UPDATED_SET:
//       return {
//         ...state,
//         exercises: state.exercises.map(exercise => {
//           if (exercise.id === action.exerciseId) {
//             exercise.sets[action.set.id] = action.set
//           }
//           return exercise
//         })
//       }
//     case REMOVED_SET: {
//       const tempExercises = [...state.exercises]
//       const oldExercises = tempExercises.map((exercise, index) => {
//         if (index === action.exerciseIndex) {
//           const tempSets = exercise.sets.filter((singleSet, index) => {
//             if (index !== action.setIndex) { return { ...singleSet } }
//           })
//           return { ...exercise, sets: tempSets }
//         }
//         return { ...exercise }
//       })
//       return { ...state, exercises: oldExercises }
//     }
//     case COMPLETE_SET: {
//       // const oldExercises = [...state.exercises]
//       // const tempExercises = oldExercises.map((exercise, index) => {
//       //   if (index === action.exerciseIndex) {
//       //     return {
//       //       ...exercise,
//       //       sets: exercise.sets.map((singleSet, index) => {
//       //         if (index === action.setIndex) {
//       //           singleSet.completeStatus = !singleSet.completeStatus
//       //         }
//       //         return singleSet
//       //       })
//       //     }
//       //   }
//       //   return exercise
//       // })
//       // return { ...state, exercises: tempExercises }
//         return produce(state,(draft)=>{
//             draft.exercises[action.exerciseIndex].sets[action.setIndex].completeStatus=! draft.exercises[action.exerciseIndex].sets[action.setIndex].completeStatus
//         })
//     }
//     default:
//       return state
//   }
// }

const workoutlogReducer = produce((draft, action) => {
  switch (action.type) {
    // exercise action section..............................................................
    case ADDED_EXERCISE: {
      const tempExercise = { ...action.exercise, sets: [{ ...emptySet }] }
      draft.exercises.push(tempExercise)
      return draft
    }
    case REMOVED_EXERCISE: {
      draft.exercises = draft.exercises.filter((singleExercise, index) => index !== action.exerciseIndex)
      return draft
    }
    // set action section..............................................................
    case COMPLETE_SET: {
      draft.exercises[action.exerciseIndex].sets[action.setIndex].completeStatus =
                !draft.exercises[action.exerciseIndex].sets[action.setIndex].completeStatus
      return draft
    }
    case REMOVED_SET: {
      draft.exercises[action.exerciseIndex].sets =
                draft.exercises[action.exerciseIndex].sets.filter((singleSet, index) => index !== action.setIndex)

      if (draft.exercises[action.exerciseIndex].sets.length === 0) {
        draft.exercises = draft.exercises.filter((singleExercise, index) => index !== action.exerciseIndex)
      }
      return draft
    }
    case ADDED_SET: {
      draft.exercises[action.exerciseIndex].sets.push({ ...emptySet })
      return draft
    }
    default:
      return draft
  }
}, initialStateWorkout)

export default workoutlogReducer
