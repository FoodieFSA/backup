import * as Yup from 'yup'
import BaseForm from '../Components/BaseForm'
import AppTextField from '../Components/AppTextField'
import {
  FormControl,
  Select,
  InputLabel,
  Button,
  Container,
  Avatar,
  Typography,
  makeStyles
} from '@material-ui/core'
import { connect } from 'react-redux'
import { useState } from 'react'
// import produce from 'immer'
import api from '../Api'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import history from '../history'
import { updateUserThunk } from '../store'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '79vh'
  },
  button: {
    margin: '10px',
    fontWeight: 'bolder'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
function UserProfileForm ({ userId, updateUser }) {
  const classes = useStyles();
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    user_gender: '',
    user_dob: '',
    user_height: '',
    user_weight: ''
  })

  const onStartTransform = (data) => {
    setState(data)
    return data
  }
  /*
  firstname
  lastname
  gender
  dob
  height
  weight
  */
  const ValidationSchema = Yup.object({
    first_name: Yup.string()
      .max(15, 'Must be 15 characters or less').required()
      .label('First Name'),
    last_name: Yup.string()
      .max(20, 'Must be 20 characters or less').required()
      .label('Last Name'),
    user_gender: Yup.mixed()
      .oneOf(['Male', 'Female', 'Prefer not to say']).label('Gender'),
    user_dob: Yup.date().label('dob'),
    user_height: Yup.number().label('Height'),
    user_weight: Yup.number().label('Weight')
  })

  // TODO after user submit the form, run this function
  const finalCommand = () => history.push('/user-profile')
  // TODO: decide if we should have password, address, exp level field
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
                  Update Your Information
        </Typography>
        <BaseForm
          initialValues={state}
          validationSchema={ValidationSchema}
          // fastValidation
          externalApi={{
            // TODO: add the API call for submitting log-in credentials
            retrieveDocument: () => api.get(`user/getUser?id=${userId}`),
            updateDocument: updateUser
          }}
          id={userId}
          onStartTransform={onStartTransform}
          finalCommand={finalCommand}
          buttonText="Update Profile"
        >
          {(formProps) => {
            console.log(formProps)
            return (<>
              <AppTextField
                {...formProps}
                label="First Name"
                type="text"
                name="first_name"
              />
              <AppTextField
                {...formProps}
                label="Last Name"
                type="text"
                name="last_name"
              />
              <FormControl>
                <InputLabel
                  shrink
                  id="demo-simple-select-placeholder-label-label"
                >
                Gender
                </InputLabel>
                <Select
                  native
                  label="Gender"
                  name="user_gender"
                  value={formProps.values.user_gender}
                  onChange={formProps.handleChange}
                // TODO: Need to change color from grey to white
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </Select>
              </FormControl>

              <AppTextField
              // not sure if we are doing age groups
                {...formProps}
                label="DOB"
                type="date"
                name="user_dob"
              />
              <AppTextField
                {...formProps}
                // height ranges? or options
                label="Height (cm)"
                type="height"
                name="user_height"
              />
              <AppTextField
                {...formProps}
                // weight ranges or options?
                label="Weight (lbs)"
                type="weight"
                name="user_weight"
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
                onClick={formProps.handleSubmit}
              >
                  Update
              </Button>
            </>
            )
          }}
        </BaseForm>
      </div>
    </Container>
  )
}
const mapState = (state) => {
  return { userId: state.user.id }
}
const mapDispatch = (dispatch) => {
  return {
    updateUser: (userPayload) => dispatch(updateUserThunk(userPayload))
  }
}

export default connect(mapState, mapDispatch)(UserProfileForm)
