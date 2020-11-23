import { connect } from 'react-redux'
import { isClear } from '../Components'
import { Button } from '@material-ui/core'

function UserProfile ({ user, history }) {
  const handleOnClick = () => {
    history.push('/user-profile-update')
  }
  if (isClear(user)) {
    return <p>loading</p>
  }
  return (
    <div id="user-profile-page">
      <h1> My Profile Page </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <img
          src="https://cdn.patch.com/assets/layout/contribute/user-default.png"
          style={{
            height: '400px',
            width: '400px',
            borderRadius: '50%'
          }}
        />
        <div style={{ paddingTop: '40px' }}>
          <div className="user-profile-info">
            <h3>
              <span>Name: </span>
              {user.first_name + ' ' + user.last_name}
            </h3>
          </div>
          <div className="user-profile-info">
            <h3>
              <span>Email: </span>
              {user.email || 'Email Unavailable'}
            </h3>
          </div>
          <div className="user-profile-info">
            <h3>
              <span>DOB: </span>
              {user.user_dob || 'Dob Unavailable'}
            </h3>
          </div>
          <div className="user-profile-info">
            <h3>
              <span>Height: </span>
              {user.user_height || 'Height Unavailable'}
            </h3>
          </div>
          <div className="user-profile-info">
            <h3>
              <span>Weight: </span>
              {user.user_weight || 'Weight Unavailable'}
            </h3>
          </div>
          <div className="user-profile-info">
            <h3>
              <span>Gender: </span>
              {user.user_gender || 'Height Unavailable'}
            </h3>
          </div>
          <Button
            style={{ marginLeft: '25px' }}
            variant="contained"
            color="primary"
            onClick={handleOnClick}
          >
            Update Profile
          </Button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { user: state.user.userData }
}

export default connect(mapStateToProps, null)(UserProfile)
