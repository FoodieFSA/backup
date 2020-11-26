import { connect } from 'react-redux'
import { isClear } from '../Components'
import { Button } from '@material-ui/core'
import image from '../Assets/images/test.png'
import '../../css/userProfile.css'
function UserProfile ({ user, history }) {
  const handleOnClick = () => {
    history.push('/user-profile-update')
  }
  if (isClear(user)) {
    return <p>loading</p>
  }
  return (
    <div id="user-profile-page">
      <img src={image} id='user-avatar'/>
      <div id ='user-info'>
        <h3 style={{ textTransform: 'capitalize' }}>
          <span>Name: </span>
          {user.first_name + ' ' + user.last_name}
        </h3>
        <h3>
          <span>Email: </span>
          {user.email || 'Email Unavailable'}
        </h3>
        <h3>
          <span>Height: </span>
          {user.user_height || 'Height Unavailable'}
        </h3>
        <h3>
          <span>Weight: </span>
          {user.user_weight || 'Weight Unavailable'}
        </h3>

        <h3>
          <span>Gender: </span>
          {user.user_gender || 'Height Unavailable'}
        </h3>
        <Button
          // style={{ marginLeft: '25px' }}
          variant="contained"
          color="primary"
          onClick={handleOnClick}
        >
            Update Profile
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { user: state.user.userData }
}

export default connect(mapStateToProps, null)(UserProfile)
