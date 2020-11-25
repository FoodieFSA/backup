import * as Yup from 'yup'
import BaseForm from '../Components/BaseForm'
import AppTextField from '../Components/AppTextField'
import { auth } from '../store'
import { connect } from 'react-redux'
import { makeStyles, Avatar, CssBaseline, Typography, Container, Grid, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '79vh'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  button: {
    margin: '10px',
    fontWeight: 'bolder'
  }
}));

const SignUp = ({ registerUser, history, error }) => {
  const classes = useStyles();
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
                  Sign up
        </Typography>

        <span style={{ color: 'red' }}>{error}</span>
        <BaseForm
          initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
          validationSchema={ValidationSchema}
          fastValidation
          externalApi={{
            insertDocument: registerUser
          }}
          finalCommand={finalCommand}
        >
          {(formProps) => (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <AppTextField
                    {...formProps}
                    label="First Name"
                    type="text"
                    name="firstName"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <AppTextField
                    {...formProps}
                    label="Last Name"
                    type="text"
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <AppTextField
                    {...formProps}
                    label="Email"
                    type="email"
                    name="email"
                  /></Grid>
                <Grid item xs={12}>
                  <AppTextField
                    {...formProps}
                    label="Password"
                    type="password"
                    name="password"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
                onClick={formProps.handleSubmit}
              >
                     Sign Up
              </Button>
              <Grid item xs space={5}>
                <Link to="/login" className={'navLink'} >
                      Already have an account? Sign in
                </Link>
              </Grid>
            </>
          )}
        </BaseForm>
      </div>
    </Container>
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
