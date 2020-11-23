import * as Yup from 'yup'
import BaseForm from '../Components/BaseForm'
import AppTextField from '../Components/AppTextField'
import { auth } from '../store'
import { connect } from 'react-redux'

const SignUp = ({ registerUser, history, error }) => {
  const ValidationSchema = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required()
      .label('First Name'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required()
      .label('Last Name'),
    email: Yup.string()
      .email('Invalid email address')
      .required()
      .label('Email'),
    password: Yup.string()
      .min(8, 'Password is too short -- must be at least 8 characters')
      .required()
      .label('Password')
  })

  const finalCommand = (id) => history.push('/')

  return (
    <div className="form-page">
      <div className="form-title">Create an account</div>
      <span style={{ color: 'red' }}>{error}</span>
      <BaseForm
        initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
        validationSchema={ValidationSchema}
        fastValidation
        externalApi={{
          insertDocument: registerUser
        }}
        finalCommand={finalCommand}
        buttonText="Sign Up"
      >
        {(formProps) => (
          <>
            <AppTextField
              {...formProps}
              label="First Name"
              type="text"
              name="firstName"
            />
            <AppTextField
              {...formProps}
              label="Last Name"
              type="text"
              name="lastName"
            />
            <AppTextField
              {...formProps}
              label="Email"
              type="email"
              name="email"
            />
            <AppTextField
              {...formProps}
              label="Password"
              type="password"
              name="password"
            />
          </>
        )}
      </BaseForm>
    </div>
  )
}
const mapState = (state) => {
  return {
    error: state.user.error
  }
}
const mapDispatch = (dispatch) => {
  return {
    registerUser: (payload) => dispatch(auth(payload, 'registerUser'))
  }
}

export default connect(mapState, mapDispatch)(SignUp)
