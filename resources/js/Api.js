import axios from 'axios'
// import moment from 'moment'
import { isClear } from './Components'
import { refreshUserToken, store, removeUser, me } from './store'
import history from './history'

const serverUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/' : 'https://keepupfsa.herokuapp.com/api/'

const api = axios.create({
  baseURL: serverUrl
})

api.interceptors.request.use(
  async config => {
    const userInfo = store.getState().user

    if (isClear(userInfo.id)) {
      return config
    }

    // const momentNow = moment.utc()
    // const expireMoment = moment.utc(userInfo.expiresIn)
    // const minutesLeft = expireMoment.diff(momentNow, 'seconds')
    // if (minutesLeft < 0 && !isClear(userInfo.id)) {
    //   const tokenResponse = await axios.post(`${serverUrl}/auth/refresh_token`, null,
    //     {
    //       withCredentials: true
    //     })
    //   const tokenInfo = tokenResponse.data
    //   const refreshUser = {
    //     accessToken: tokenInfo.accessToken,
    //     tokenType: tokenInfo.tokenType,
    //     expiresIn: tokenInfo.expiresIn,
    //     id: userInfo.id,
    //     userType: userInfo.userType,
    //     userData: userInfo.userData
    //   }
    //   store.dispatch(refreshUserToken(refreshUserrefreshUser))
    //   config.headers.Authorization = userInfo.tokenType + ' ' + userInfo.accessToken
    //   return config
    // } else {
    config.headers.Authorization = userInfo.tokenType + ' ' + userInfo.accessToken
    return config
  }, error => Promise.reject(error)
)
// https://medium.com/swlh/handling-access-and-refresh-tokens-using-axios-interceptors-3970b601a5da
// https://gist.github.com/mkjiau/650013a99c341c9f23ca00ccb213db1c
api.interceptors.response.use(response => response,
  async error => {
    const { config, response: { status } } = error;
    const originalRequest = config;
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const userInfo = store.getState().user

      if (isClear(userInfo.id)) {
        return Promise.reject(error);
      }
      const refreshToken = await onRefreshTokens()
      if (!isClear(refreshToken)) {
        originalRequest.headers.Authorization = refreshToken.tokenType + ' ' + refreshToken.accessToken
        return new Promise((resolve) => resolve(axios(originalRequest)))
      } else {
        alert('there is an error, please login back in again and try again!')
        // clear the store and redirect user back to login page
        store.dispatch(removeUser())
        history.push('/login')
        return Promise.reject(error);
      }
    }
    return Promise.reject(error)
  }
)
function onRefreshTokens () {
  return axios.post(`${serverUrl}auth/refresh_token`, null, { withCredentials: true }).then(async response => {
    const tokenInfo = response.data
    if (isClear(tokenInfo.accessToken)) {
      return null
    }

    const refreshToken = {
      accessToken: tokenInfo.accessToken,
      tokenType: tokenInfo.tokenType,
      expiresIn: tokenInfo.expiresIn
    }
    // update user's info and tokens
    store.dispatch(me())
    store.dispatch(refreshUserToken(refreshToken))
    return refreshToken
  }).catch(error => {
    console.error(error)
    return null
  })
}
export default api
