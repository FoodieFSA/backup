import {
  InputBase,
  Paper,
  IconButton, makeStyles
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
    width: 300
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}));
const AppSearchInput = ({ handleSearchInput, searchValue, placeHolder }) => {
  const classes = useStyles();
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        value={searchValue}
        onChange={handleSearchInput}
        placeholder={placeHolder}
        inputProps={{ 'aria-label': placeHolder }}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default AppSearchInput
