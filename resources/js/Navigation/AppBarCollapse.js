/**
 * Code from the below medium post, only updated for latest material UI, using a
 * Menu for the popup and with breakpoints that work.
 *
 * https://medium.com/@habibmahbub/create-appbar-material-ui-responsive-like-bootstrap-1a65e8286d6f
 */
import { Button, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'
// for material ui Icons
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LaunchIcon from '@material-ui/icons/Launch';
// End of icons
import { withStyles } from '@material-ui/core/styles'
import ButtonAppBarCollapse from './ButtonAppBarCollapse'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store'

const styles = (theme) => ({
  root: {
    position: 'absolute',
    right: '15px'
  },
  buttonBar: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    margin: '10px',
    marginLeft: '15px',
    right: 0,
    position: 'relative',
    width: '100%',
    background: 'transparent'
  }
})

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);
const AppBarCollapse = ({ classes, isLoggedIn, logout }) => {
  // TODO use the isLoggedIn to display different Link
  console.log('user is logging: ', isLoggedIn)
  return (
    <div className={classes.root}>
      <ButtonAppBarCollapse>
        {/* for the buttons required user login,place inside */}
        { !isLoggedIn
          ? <div className='navbarLink' >
            <Link to="/workout-log">
              <StyledMenuItem>
                <ListItemIcon>
                  <AddCircleOutlineIcon/>
                </ListItemIcon>
                <ListItemText primary="Add Workout Log" />
              </StyledMenuItem>
            </Link>
            <Link to="/user-profile">
              <StyledMenuItem>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </StyledMenuItem>
            </Link>
            <StyledMenuItem onClick={logout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </StyledMenuItem>
          </div>
          : <div className='navbarLink' >
            {/* for the buttons not required user to login,place inside */}
            <Link to="/login">
              <StyledMenuItem>
                <ListItemIcon>
                  <LaunchIcon/>
                </ListItemIcon>
                <ListItemText primary="Login" />
              </StyledMenuItem>
            </Link>
            <Link to="/signup">
              <StyledMenuItem>
                <ListItemIcon>
                  <PersonAddIcon/>
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </StyledMenuItem>
            </Link>
          </div>}
      </ButtonAppBarCollapse>
      <div className={classes.buttonBar} id="appbar-collapse">
        {/* TODO using react-router to click on the button for the form */}
        {isLoggedIn
          ? <>
            <Link to="/workout-log">
              <Button color="inherit">Add Workout Log</Button>
            </Link>
            <Link to="/user-profile">
              <Button color="inherit">My Profile</Button>
            </Link>
            <Button color="inherit" style={{ color: 'black' }} onClick={logout}>Log Out</Button>
          </> : <>
            <Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
            <Link to="/signup">
              <Button color="inherit">Signup</Button>
            </Link>
          </>}

      </div>
    </div>
  )
}
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}
const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}
export default connect(mapState, mapDispatch)(withStyles(styles)(AppBarCollapse))
