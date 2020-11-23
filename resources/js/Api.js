import axios from 'axios'
// import moment from 'moment'
import { isClear } from './Components'
import { store, refreshUserToken } from './store'
import history from './history'

const serverUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api/' : 'https://backupfsa.herokuapp.com/api/'
// const serverUrl='sds'
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
    const originalRequest = error.config;
    console.log(originalRequest.url)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const userInfo = store.getState().user

      if (isClear(userInfo.id)) {
        return Promise.reject(error);
      }

      axios.post(`${serverUrl}/auth/refresh_token`, null, { withCredentials: true }).then(response => {
        const tokenInfo = response.data
        if (isClear(tokenInfo.accessToken)) {
          history.push('/login')
          return Promise.reject(error);
        }
        const refreshUser = {
          accessToken: tokenInfo.accessToken,
          tokenType: tokenInfo.tokenType,
          expiresIn: tokenInfo.expiresIn,
          id: userInfo.id,
          userType: userInfo.userType,
          userData: userInfo.userData
        }
        store.dispatch(refreshUserToken(refreshUser))

        originalRequest.headers.Authorization = tokenInfo.tokenType + ' ' + tokenInfo.accessToken
        return new Promise((resolve) => resolve(axios(originalRequest)))
      }).catch(error => {
        console.log(error)
        history.push('/login')
      })
    }
    return Promise.reject(error)
  }
)

export default api
