import { useEffect } from 'react'
import '../css/app.css'
import Footer from './Components/Footer'
import NavBar from './Navigation/NavBar'
import Routes from './Navigation/routes'
import Api from './Api'

function App () {
  // const [loading, setLoading] = useState(true)
  useEffect(() => {
    Api.get('test').then(res => {
      console.log(res)
    })
    // Api.post('auth/refresh_token', null, {
    //   withCredentials: true
    // }).then(res => {
    //   console.log(res.data.accessToken)
    // })

    // axios.post(`${serverUrl}/auth/refresh_token`, null,
    //    {
    //      withCredentials: true
    //    }).then(tokenResponse=>{
    //   const tokenInfo = tokenResponse.data
    //   const refreshUser = {
    //     accessToken: tokenInfo.accessToken,
    //     tokenType: tokenInfo.tokenType,
    //     expiresIn: tokenInfo.expiresIn,
    //     id: userInfo.id,
    //     userType: userInfo.userType,
    //     userData: userInfo.userData
    //   }
    //   store.dispatch(refreshUserToken(refreshUser))
    // })
  }, [])
  // if (loading) {
  //   return <div>loading....</div>
  // }
  return (
    <div className='App'>
      <NavBar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
