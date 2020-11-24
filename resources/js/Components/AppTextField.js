import { TextField } from '@material-ui/core'
import { SetFormMessage } from './index'

const AppTextField = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        color: 'red'
      }}
    >
      <TextField
        id={props.name}
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label={props.label}
        type={props.type}
        name={props.name}
        value={props.values[props.name]}
        onChange={props.handleChange}
        autoComplete={props.name}
        autoFocus
      />
      {props.name in props.errors
        ? SetFormMessage(props.errors[props.name])
        : ' '}
    </div>
  )
}

export default AppTextField
