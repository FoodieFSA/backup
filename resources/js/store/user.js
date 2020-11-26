import Api from '../Api'
import history from '../history'
// import produce from 'immer'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const REFRESH_TOKEN = ' REFRESH_TOKEN'
const UPDATE_USER = 'UPDATE_USER'
/**
 * INITIAL STATE
 */
const defaultUser = { }

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
const updateUser = (userData) => ({ type: UPDATE_USER, userData })

export const refreshUserToken = (user) => ({ type: REFRESH_TOKEN, user })
/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await Api.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (payload, method) => async (dispatch) => {
  let res

  try {
    res = await Api.post(`/auth/${method}`, payload, { withCredentials: true })
  } catch (authError) {
    return throw new Error(authError.response.data.error)
  }
  try {
    dispatch(getUser(res.data))
    return res
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async (dispatch) => {
  Api.post('/auth/logout').then(response => {
    const { data } = response
    if (data.isLoggedOut) {
      dispatch(removeUser())
      history.push('/login')
    } else {
      alert('There is an error on logout,please try again!')
    }
  }).catch(error => {
    console.error(error)
  })
}

export const updateUserThunk = (userPayload) => async (dispatch) => {
  Api.put('user/updateUser', userPayload).then(response => {
    console.log(response, 'Sdsdskdjskdjskdjsdk')
    const { data } = response
    console.log(data, 'SDSDsdsdsd daaaaaaaaaaaaaaaaaa')
    dispatch(updateUser(data.userData))
  }).catch(error => {
    console.error(error)
    alert('There is an error on updating,please try again!')
  })
}
/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return { ...state, userData: action.userData }
    case REFRESH_TOKEN:
      return action.user
    default:
      return state
  }
}
