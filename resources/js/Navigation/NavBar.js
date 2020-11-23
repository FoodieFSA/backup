import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import AppBarCollapse from './AppBarCollapse'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(5)
  },
  title: {
    flexGrow: 1,
    color: '#C0C0C0',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  appBarBackground: {
    backgroundColor: '#4169E1'
  }
}))

const NavBar = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBarBackground}
        color='primary'
        position='static'
      >
        <Toolbar>
          <Link to="/">
            <Typography variant='h3' className={classes.title}>
              KeepUp
            </Typography>
          </Link>
          <AppBarCollapse />
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
