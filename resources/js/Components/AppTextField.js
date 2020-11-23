import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { SetFormMessage } from './index'

const useStyles = makeStyles(() => ({
  root: {
    padding: '20px 0'
  },
  input: {
    color: 'black'
  },
  text: {
    fontSize: 'medium',
    fontStyle: 'italic',
    fontWeight: 'bolder'
  }
}))

const AppTextField = (props) => {
  const classes = useStyles()
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        color: 'red'
      }}
    >
      <TextField
        // id='standard-basic'
        className={classes.root}
        InputLabelProps={{ className: classes.input, shrink: true }}
        InputProps={{ className: classes.input }}
        label={props.label}
        type={props.type}
        name={props.name}
        value={props.values[props.name]}
        onChange={props.handleChange}
        autoComplete={props.name}
      />
      {props.name in props.errors
        ? SetFormMessage(props.errors[props.name])
        : ' '}
    </div>
  )
}

export default AppTextField
