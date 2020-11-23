import { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Menu } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'

const styles = theme => ({
  buttonCollapse: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
    margin: '10px',
    boxShadow: 'none'
  }
})

const ButtonAppBarCollapse = ({ classes, children }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleMenu = event => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const open = Boolean(anchorEl)
  return (
    <div className={classes.buttonCollapse}>
      <IconButton onClick={handleMenu}>
        <HomeIcon />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      >
        {children}
      </Menu>
    </div>
  )
}
export default withStyles(styles)(ButtonAppBarCollapse)
