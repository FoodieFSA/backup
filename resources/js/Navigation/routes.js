import { withRouter, Route, Switch } from 'react-router-dom'
import { SignUp, LogIn, Home, Error, UserProfile, UserProfileForm, WorkoutLog } from '../pages'
import { connect } from 'react-redux'

function Router ({ isLoggedIn, location }) {
  // TODO  use the IsLoggedIn to restrict user for different route
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      {/* {isLoggedIn && */}
      {/* <Switch> */}
      <Route path="/user-profile-update" component={UserProfileForm}/>
      <Route path="/user-profile" component={UserProfile} />
      <Route path="/workout-log" component={WorkoutLog} />
      {/* </Switch> */}
      {/* } */}
      <Route component={Error} />
    </Switch>
  )
}
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}
export default withRouter(connect(mapState, null)(Router))
