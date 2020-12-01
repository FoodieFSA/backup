import Api from '../../Api'
import history from '../../history'
import produce from 'immer'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const REFRESH_TOKEN = ' REFRESH_TOKEN'
const UPDATE_USER = 'UPDATE_USER'
const GET_ME = 'GET_ME'
/**
 * INITIAL STATE
 */
const defaultUser = { }

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({ type: GET_USER, user })
export const removeUser = () => ({ type: REMOVE_USER })
const updateUser = (userData) => ({ type: UPDATE_USER, userData })
const gotMe = (myData) => ({ type: GET_ME, myData })
export const refreshUserToken = (token) => ({ type: REFRESH_TOKEN, token })
/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await Api.get('user/getMe')
    dispatch(gotMe(res.data || defaultUser))
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
  try {
    const response = await Api.put('user/updateUser', userPayload)
    dispatch(updateUser(response.data))
    return response
  } catch (error) {
    alert('There is an error on updating,please try again!')
    return error
  }
}
/**
 * REDUCER
 */
const userReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      draft.userData = action.userData
      return draft
    case REFRESH_TOKEN:
      draft.accessToken = action.token.accessToken
      draft.expiresIn = action.token.expiresIn
      draft.tokenType = action.token.tokenType
      return draft
    case GET_ME:
      draft.id = action.myData.id
      draft.userType = action.myData.user_type
      draft.userData = action.myData
      return draft
    default:
      return draft
  }
}, defaultUser)

export default userReducer
// export default function (state = defaultUser, action) {
//   switch (action.type) {
//     case GET_USER:
//       return action.user
//     case REMOVE_USER:
//       return defaultUser
//     case UPDATE_USER:
//       return { ...state, userData: action.userData }
//     case REFRESH_TOKEN:
//       return action.user
//       case  GET_ME：
//
//     default:
//       return state
//   }
// }
