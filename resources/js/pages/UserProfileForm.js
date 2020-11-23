import * as Yup from 'yup'
import BaseForm from '../Components/BaseForm'
import AppTextField from '../Components/AppTextField'
import { FormControl, Select, InputLabel } from '@material-ui/core'
import { connect } from 'react-redux'
import { useState } from 'react'
// import produce from 'immer'
import api from '../Api'
function UserProfileForm ({ userId }) {
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
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required()
      .label('First Name'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required()
      .label('Last Name'),
    gender: Yup.mixed()
      .oneOf(['Male', 'Female', 'Prefer not to say'])
      .required()
      .label('Gender'),
    dob: Yup.date().required().label('dob'),
    height: Yup.number().required().label('Height'),
    weight: Yup.number().required().label('Weight')
  })

  // TODO after user submit the form, run this function
  const finalCommand = () => {
    console.log('hello')
    // TODO: update user info
  }
  // TODO: decide if we should have password, address, exp level field
  return (
    <div id="user-profile-form" className="form-page">
      <BaseForm
        initialValues={state}
        validationSchema={ValidationSchema}
        fastValidation
        externalApi={
          {
            // TODO: add the API call for submitting log-in credentials
            retrieveDocument: (id) => api.get(`user/getUser?id=${id}`)
          }
        }
        id={userId}
        onStartTransform={onStartTransform}
        finalCommand={finalCommand}
        buttonText="Update Profile"
      >
        {(formProps) => (
          <>
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
                // TODO: Need to change color from grey to white
              >
                <option aria-label="None" value="" />
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
              InputLabelProps={{
                shrink: true
              }}
            />
            <AppTextField
              {...formProps}
              // weight ranges or options?
              label="Weight (lbs)"
              type="weight"
              name="user_weight"
              InputLabelProps={{
                shrink: true
              }}
            />
          </>
        )}
      </BaseForm>
    </div>
  )
}
const mapState = (state) => {
  return { userId: state.user.id }
}

export default connect(mapState, null)(UserProfileForm)
